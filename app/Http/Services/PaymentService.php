<?php

namespace App\Http\Services;

use App\Http\Resources\PaymentResource;
use App\Models\CreditNote;
use App\Models\Invoice;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PaymentService extends Service
{
    /*
     * Fetch All Payments
     */
    public function index($request)
    {
        $paymentQuery = new Payment;

        $paymentQuery = $this->search($paymentQuery, $request);

        $sum = $paymentQuery->sum("amount");

        $payments = $paymentQuery
            ->orderBy("id", "DESC")
            ->paginate(20)
            ->appends([
                "propertyId" => $request->propertyId,
                "unitId" => $request->unitId,
            ]);

        return PaymentResource::collection($payments)
            ->additional(["sum" => number_format($sum)]);
    }

    /*
     * Display the specified resource.
     */
    public function show($id)
    {
        $payment = Payment::findOrFail($id);

        return new PaymentResource($payment);
    }

    /*
     * Store a newly created resource in storage.
     */
    public function store($request)
    {
		// Get current year in the format YY using Carbon
		$currentYear = Carbon::now()->format('y');
		// Get current month in the format MM using Carbon
		$currentMonth = Carbon::now()->format('m');
		// Get next invoice iteration
		$count = Payment::count() + 1;
		// Generate invoice code
		$code = "P-" . $currentYear . $currentMonth . str_pad($count, 2, '0', STR_PAD_LEFT);

		$payment = new Payment;
        $payment->invoice_id = $request->invoiceId;
        $payment->user_id = $request->userId;
        $payment->code = $code;
        $payment->amount = $request->amount;
        $payment->transaction_reference = $request->transactionReference;
        $payment->channel = $request->channel;
        $payment->paid_on = $request->paidOn;
        $payment->created_by = $this->id;

        $saved = DB::transaction(function () use ($payment) {
            $saved = $payment->save();

            $this->updateInvoice($payment->invoice_id);

            return $saved;
        });

        $message = "Payment added successfully";

        return [$saved, $message, $payment];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($request, $id)
    {
        $payment = Payment::findOrFail($id);

        if ($request->filled("amount")) {
            $payment->amount = $request->input("amount");
        }

        if ($request->filled("transactionReference")) {
            $payment->transaction_reference = $request->input("transactionReference");
        }

        if ($request->filled("channel")) {
            $payment->channel = $request->input("channel");
        }

        if ($request->filled("paidOn")) {
            $payment->paid_on = $request->input("paidOn");
        }

        $saved = DB::transaction(function () use ($payment) {
            $saved = $payment->save();

            $this->updateInvoice($payment->invoice_id);

            return $saved;
        });

        $message = "Payment updated successfully";

        return [$saved, $message, $payment];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);

        $deleted = DB::transaction(function () use ($payment) {
            $deleted = $payment->delete();

            $this->updateInvoice($payment->invoice_id);

            return $deleted;
        });

        $message = "Payment deleted successfully";

        return [$deleted, $message, $payment];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        $propertyId = explode(",", $request->propertyId);

        if ($request->filled("propertyId")) {
            $query = $query->whereHas("invoice.userUnit.unit.property", function ($query) use ($propertyId) {
                $query->whereIn("id", $propertyId);
            });
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
				->whereHas("invoice.userUnit.unit", function ($query) use ($unit) {
					$query->where("name", "LIKE", "%" . $unit . "%");
				});
		}

        $tenant = $request->input("tenant");

        if ($request->filled("tenant")) {
            $query = $query
                ->whereHas("invoice.userUnit.user", function ($query) use ($tenant) {
                    $query->where("name", "LIKE", "%" . $tenant . "%");
                });
        }

        $startMonth = $request->filled("startMonth") ? $request->input("startMonth") : Carbon::now()->month;
        $endMonth = $request->filled("endMonth") ? $request->input("endMonth") : Carbon::now()->month;
        $startYear = $request->filled("startYear") ? $request->input("startYear") : Carbon::now()->year;
        $endYear = $request->filled("endYear") ? $request->input("endYear") : Carbon::now()->year;

        $start = Carbon::createFromDate($startYear, $startMonth, 1)
            ->startOfMonth()
            ->toDateTimeString(); // Output: 2024-01-01 00:00:00 (or current year)

        $end = Carbon::createFromDate($endYear, $endMonth, 1)
            ->endOfMonth()
            ->toDateTimeString(); // Output: 2024-01-01 00:00:00 (or current year)

        if ($request->filled("startMonth") || $request->filled("startYear")) {
            $query = $query->whereDate("paid_on", ">=", $start);
        }

        if ($request->filled("endMonth") || $request->filled("endYear")) {
            $query = $query->whereDate("paid_on", "<=", $end);
        }

        return $query;
    }

    /*
     * Handle Invoice Update
     */
    public function updateInvoice($invoiceId)
    {
        $paid = Payment::where("invoice_id", $invoiceId)
            ->sum("amount");

        $credit = CreditNote::where("invoice_id", $invoiceId)
            ->sum("amount");

        $paid = $paid + $credit;

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
}
