<?php

namespace App\Http\Services;

use App\Http\Resources\InvoiceResource;
use App\Mail\InvoiceMail;
use App\Models\CreditNote;
use App\Models\Deduction;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\UserUnit;
use App\Models\WaterReading;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class InvoiceService extends Service
{
    /*
     * Fetch All Invoices
     */
    public function index($request)
    {
        $invoiceQuery = new Invoice;

        $invoiceQuery = $this->search($invoiceQuery, $request);

        $creditNotes = CreditNote::sum("amount");

        $deductions = Deduction::sum("amount");

        $paid = Payment::sum("amount");
		
        $due = $invoiceQuery->sum("amount");

        $balance = $due - $creditNotes - $paid + $deductions;

        $invoices = $invoiceQuery
            ->orderBy("month", "DESC")
            ->orderBy("year", "DESC")
            ->orderBy("id", "DESC")
            ->paginate(20)
            ->appends([
                "propertyId" => $request->propertyId,
                "unitId" => $request->unitId,
            ]);

        return InvoiceResource::collection($invoices)
            ->additional([
                "due" => number_format($due),
                "paid" => number_format($paid),
                "balance" => number_format($balance),
            ]);
    }

    /*
     * Fetch Invoice
     */
    public function show($id)
    {
        $invoice = Invoice::find($id);

        return new InvoiceResource($invoice);
    }

    /*
     * Save Invoice
     */
    public function store($request)
    {
        $saved = 0;

        foreach ($request->userUnitIds as $userUnitId) {
            // Check if invoice exists for User, Unit and Month
            $invoiceDoesntExist = Invoice::where("user_unit_id", $userUnitId)
                ->where("type", $request->type)
                ->where("month", $request->month)
                ->where("year", $request->year)
                ->doesntExist();

            $amount = $this->getAmount($request, $userUnitId);

            if ($invoiceDoesntExist) {
				// Get current year in the format YY using Carbon
				$currentYear = Carbon::now()->format('y');
				// Get current month in the format MM using Carbon
				$currentMonth = Carbon::now()->format('m');
				// Get next invoice iteration
				$count = Invoice::count() + 1;
				// Generate invoice code
				$code = "I-" . $currentYear . $currentMonth . str_pad($count, 2, '0', STR_PAD_LEFT);

                $invoice = new Invoice;
                $invoice->user_unit_id = $userUnitId;
                $invoice->code = $code;
                $invoice->type = $request->type;
                $invoice->amount = $amount;
                $invoice->balance = $amount;
                $invoice->month = $request->month;
                $invoice->year = $request->year;
                $invoice->created_by = $this->id;
                $saved = $invoice->save();
            }
        }

        if ($saved) {
            $message = count($request->userUnitIds) > 1 ?
            "Invoices created successfully" :
            "Invoice created successfully";
        } else {
            $message = count($request->userUnitIds) > 1 ?
            "Invoices already exist" :
            "Invoice already exists";
        }

        return [$saved, $message, ""];
    }

    /*
     * Destroy Invoice
     */
    public function destroy($id)
    {
        $ids = explode(",", $id);

        $deleted = Invoice::whereIn("id", $ids)->delete();

        $message = count($ids) > 1 ?
        "Invoices deleted successfully" :
        "Invoice deleted successfully";

        return [$deleted, $message, ""];
    }

    /*
     * Get Invoices by Property ID
     */
    public function byPropertyId($request, $id)
    {
        $ids = explode(",", $id);

        $invoicesQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($ids) {
            $query->whereIn("id", $ids);
        });

        $invoicesQuery = $this->search($invoicesQuery, $request);

        $due = $invoicesQuery->sum("amount");
        $paid = $invoicesQuery->sum("paid");
        $balance = $invoicesQuery->sum("balance");

        $invoices = $invoicesQuery
            ->orderBy("month", "DESC")
            ->orderBy("year", "DESC")
            ->paginate(20);

        return InvoiceResource::collection($invoices)
            ->additional([
                "due" => number_format($due),
                "paid" => number_format($paid),
                "balance" => number_format($balance),
            ]);
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        $propertyId = explode(",", $request->propertyId);

        if ($request->filled("propertyId")) {
            $query = $query->whereHas("userUnit.unit.property", function ($query) use ($propertyId) {
                $query->whereIn("id", $propertyId);
            });
        }

        $code = $request->input("code");

        if ($request->filled("code")) {
            $query = $query->where("code", "LIKE", "%" . $code . "%");
        }

		$unitId = $request->input("unitId");

		if ($request->filled("unitId")) {
			$query = $query
				->whereHas("userUnit.unit", function ($query) use ($unitId) {
					$query->where("id", $unitId);
				});
		}

		$unit = $request->input("unit");

		if ($request->filled("unit")) {
			$query = $query
				->whereHas("userUnit.unit", function ($query) use ($unit) {
					$query->where("name", "LIKE", "%" . $unit . "%");
				});
		}

        $tenant = $request->input("tenant");

        if ($request->filled("tenant")) {
            $query = $query
                ->whereHas("userUnit.user", function ($query) use ($tenant) {
                    $query->where("name", "LIKE", "%" . $tenant . "%");
                });
        }

        $type = $request->input("type");

        if ($request->filled("type")) {
            $query = $query->where("type", $type);
        }

        $status = $request->input("status");

        if ($request->filled("status")) {
            $query = $query->where("status", $status);
        }

        $startMonth = $request->input("startMonth");
        $endMonth = $request->input("endMonth");
        $startYear = $request->input("startYear");
        $endYear = $request->input("endYear");

        if ($request->filled("startMonth")) {
            $query = $query->where("month", ">=", $startMonth);
        }

        if ($request->filled("endMonth")) {
            $query = $query->where("month", "<=", $endMonth);
        }

        if ($request->filled("startYear")) {
            $query = $query->where("year", ">=", $startYear);
        }

        if ($request->filled("endYear")) {
            $query = $query->where("year", "<=", $endYear);
        }

        return $query;
    }

    /*
     * Get Amount
     */
    public function getAmount($request, $userUnitId)
    {
        $userUnit = UserUnit::find($userUnitId);

        // Get amount depending on the type of invoice
        switch ($request->type) {
            case "rent":
                return $userUnit->unit->rent;
                break;

            case "service_charge":
                return $userUnit->unit->property->service_charge;
                break;

            default:
                return $this->getWaterBill($request, $userUnitId);
                break;
        }
    }

    /*
     * Get Water Bill
     */
    public function getWaterBill($request, $userUnitId)
    {
        // Get Water Bill
        $waterReadingQuery = WaterReading::where("user_unit_id", $userUnitId)
            ->where("month", $request->month)
            ->where("year", $request->year);

        if ($waterReadingQuery->doesntExist()) {
            return throw ValidationException::withMessages([
                "Water Reading" => ["Water Reading doesn't exist"],
            ]);
        } else {
            return $waterReadingQuery->first()->bill;
        }
    }

    /*
     * Handle Invoice Adjustment
     */
    public function adjustInvoice($invoiceId)
    {
        $paid = Payment::where("invoice_id", $invoiceId)->sum("amount");

        $creditNotes = CreditNote::where("invoice_id", $invoiceId)->sum("amount");

        $deductions = Deduction::where("invoice_id", $invoiceId)->sum("amount");

        $paid = $paid + $creditNotes - $deductions;

        $invoice = Invoice::find($invoiceId);

        $balance = $invoice->amount - $paid;

        // Check if paid is enough
        if ($paid == 0) {
            $status = "not_paid";
        } else if ($paid < $invoice->amount) {
            $status = "partially_paid";
        } else if ($paid == $invoice->amount) {
            $status = "paid";
        } else {
            $status = "over_paid";
        }

        $invoice->paid = $paid;
        $invoice->balance = $balance;
        $invoice->status = $status;

        return $invoice->save();
    }

    /*
     * Send Invoice by Email
     */
    public function sendEmail($id)
    {
        $invoice = Invoice::findOrFail($id);

        try {
            Mail::to($invoice->userUnit->user->email)->send(new InvoiceMail($invoice));

            // Increment the emails_sent column
            $invoice->increment("emails_sent");

            // Save Email
            $emailService = new EmailService;

            // Populate Email Service with request details
            $emailService->user_unit_id = $invoice->userUnit->id;
            $emailService->email = $invoice->userUnit->user->email;
            $emailService->model = $invoice->userUnit->id;

            $emailService->store($emailService);

        } catch (\Symfony\Component\Mailer\Exception\HttpTransportException $exception) {

            throw $exception;
        }

        return ["Success", "Invoice Email Sent Successfully", $invoice];
    }

    /*
     * Send Invoice by SMS
     */
    public function sendSMS($id)
    {
        $invoice = Invoice::findOrFail($id);

        $smsService = new SMSService($invoice);

        $status = $smsService->sendSMS("invoice");

        return [$status, "Invoice SMS Sent Successfully", $invoice];
    }
}
