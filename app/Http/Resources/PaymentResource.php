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
        return [
            "id" => $this->id,
            "tenantName" => $this->userUnit->user->name,
            "tenantEmail" => $this->userUnit->user->email,
            "tenantPhone" => $this->userUnit->user->phone,
            "unitName" => $this->userUnit->unit->name,
            "code" => $this->code,
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
