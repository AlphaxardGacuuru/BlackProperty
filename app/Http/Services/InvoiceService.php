<?php

namespace App\Http\Services;

use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Models\UserUnit;
use App\Models\WaterReading;
use Illuminate\Validation\ValidationException;

class InvoiceService extends Service
{
    /*
     * Fetch All Invoices
     */
    public function index($request)
    {
        $invoicesQuery = new Invoice;

        $invoicesQuery = $this->search($invoicesQuery, $request);

        $invoices = $invoicesQuery
            ->orderBy("month", "ASC")
            ->orderBy("year", "DESC")
            ->paginate(20);

        return InvoiceResource::collection($invoices);
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
                $invoice = new Invoice;
                $invoice->user_unit_id = $userUnitId;
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
        $tenant = $request->input("tenant");

        if ($request->filled("tenant")) {
            $query = $query
                ->whereHas("userUnit.user", function ($query) use ($tenant) {
                    $query->where("name", "LIKE", "%" . $tenant . "%");
                });
        }

        $unit = $request->input("unit");

        if ($request->filled("unit")) {
            $query = $query
                ->whereHas("userUnit.unit", function ($query) use ($unit) {
                    $query->where("name", "LIKE", "%" . $unit . "%");
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

        $propertyId = $request->input("propertyId");

        if ($request->filled("propertyId")) {
            $query = $query->whereHas("userUnit.unit.property", function ($query) use ($propertyId) {
                $query->where("id", $propertyId);
            });
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
}
