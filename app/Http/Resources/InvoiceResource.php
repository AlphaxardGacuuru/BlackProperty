<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
			"tenantId" => $this->user_id,
			"tenantName" => $this->user->name,
			"tenantPhone" => $this->user->phone,
			"tenantEmail" => $this->user->email,
			"unitId" => $this->unit_id,
			"unitName" => $this->unit->name,
			"type" => $this->type,
			"amount" => number_format($this->amount),
			"status" => $this->status,
			"month" => $this->month,
			"year" => $this->year,
			"updatedAt" => $this->updatedAt,
			"createdAt" => $this->createdAt,
		];
    }
}
