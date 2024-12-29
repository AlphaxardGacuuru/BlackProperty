<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $invoiceCode = str_pad($this->invoice_id, 6, '0', STR_PAD_LEFT);
        $invoiceCode = "I-" . $invoiceCode;

        return [
            "id" => $this->id,
            "tenantName" => $this->invoice->userUnit->user->name,
            "tenantEmail" => $this->invoice->userUnit->user->email,
            "tenantPhone" => $this->invoice->userUnit->user->phone,
            "unitName" => $this->invoice->userUnit->unit->name,
            "invoiceId" => $this->invoice_id,
            "invoiceCode" => $invoiceCode,
            "channel" => $this->channel,
            "transactionReference" => $this->transaction_reference,
            "amount" => number_format($this->amount),
            "paidOn" => $this->paid_on,
            "paidOnFormatted" => Carbon::parse($this->paid_on)->format("Y-m-d"),
            "updatedAt" => $this->updatedAt,
            "createdAt" => $this->createdAt,
        ];
    }
}
