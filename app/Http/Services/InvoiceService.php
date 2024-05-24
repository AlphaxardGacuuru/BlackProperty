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

            $invoice = new Invoice;
            $invoice->user_id = $userUnit->user_id;
            $invoice->unit_id = $userUnit->unit_id;
            $invoice->type = $request->type;
            $invoice->amount = $userUnit->unit->rent;
            $invoice->month = $request->month;
            $invoice->created_by = $this->id;
            $saved = $invoice->save();
        }

        $message = count($request->userUnitIds) > 1 ?
        "Invoices created successfully" :
        "Invoice created successfully";

        return [$saved, $message, $invoice];
    }

    /*
     * Destroy Invoice
     */
    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);

        $deleted = $invoice->delete();

        return [$deleted, "Invoice deleted successfully", $invoice];
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
