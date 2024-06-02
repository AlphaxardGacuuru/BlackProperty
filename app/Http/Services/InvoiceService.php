<?php

namespace App\Http\Services;

use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Models\UserUnit;

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
            ->orderBy("id", "DESC")
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
        foreach ($request->userUnitIds as $userUnitId) {
            $userUnit = UserUnit::find($userUnitId);

            // Check if invoice exists for User, Unit and Month
            $invoiceDoesntExist = Invoice::where("user_id", $userUnit->user_id)
                ->where("unit_id", $userUnit->unit_id)
                ->where("month", $request->month)
                ->where("type", $request->type)
                ->doesntExist();

            $saved = 0;

            // Get amount depending on the type of invoice
            switch ($request->type) {
                case "rent":
                    $amount = $userUnit->unit->rent;
                    break;

                case "water":
                    $amount = $userUnit->unit->property->service_charge;
                    break;

                default:
                    $amount = $userUnit->unit->property->service_charge;
                    break;
            }

            if ($invoiceDoesntExist) {
                $invoice = new Invoice;
                $invoice->user_id = $userUnit->user_id;
                $invoice->unit_id = $userUnit->unit_id;
                $invoice->type = $request->type;
                $invoice->amount = $amount;
                $invoice->month = $request->month;
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

        $invoicesQuery = Invoice::whereHas("unit.property", function ($query) use ($ids) {
            $query->whereIn("id", $ids);
        });

        $invoicesQuery = $this->search($invoicesQuery, $request);

        $invoices = $invoicesQuery
            ->orderBy("id", "DESC")
            ->paginate(20);

        return InvoiceResource::collection($invoices);
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        $name = $request->input("name");

        if ($request->filled("name")) {
            $query = $query
                ->whereHas("user", function ($query) use ($name) {
                    $query->where("name", "LIKE", "%" . $name . "%");
                });
        }

        return $query;
    }
}
