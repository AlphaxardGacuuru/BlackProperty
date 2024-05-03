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
			"tenant" => $this->user->name,
			"tenantId" => $this->user_id,
			"unitId" => $this->unit_id,
			"type" => $this->type,
			"amount" => number_format($this->amount),
			"status" => $this->status,
			"updatedAt" => $this->updatedAt,
			"createdAt" => $this->createdAt,
		];
    }
}
