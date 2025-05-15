<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DeductionResource extends JsonResource
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
            "tenantName" => $this->userUnit->user->name,
            "unitId" => $this->userUnit->unit->id,
            "unitName" => $this->userUnit->unit->name,
            "description" => $this->description,
            "amount" => number_format($this->amount),
			"month" => $this->month,
			"year" => $this->year,
            "createdBy" => $this->createdBy,
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
