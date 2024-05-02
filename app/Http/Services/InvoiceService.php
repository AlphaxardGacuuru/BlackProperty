<?php

namespace App\Http\Services;

use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;

class InvoiceService extends Service
{
    /*
     * Fetch All Invoices
     */
    public function index()
    {
        $invoices = Invoice::orderBy("id", "DESC")->paginate(20);

        return InvoiceResource::collection($invoices);
    }

    /*
     * Save Invoice
     */
    public function store($request)
    {
        foreach ($request->tenantIds as $tenantId) {
            $tenant = User::find($tenantId);

            $invoice = new Invoice;
            $invoice->user_id = $request->tenantId;
            $invoice->unit_id = $tenant->currentUnit()?->id;
            $invoice->unit_id = $request->type;
            $invoice->amount = $tenant->currentUnit()?->rent;
            $saved = $invoice->save();
        }

        return [$saved, "Invoice saved", $invoice];
    }
}
