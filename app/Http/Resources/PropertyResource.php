<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
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
			"name" => $this->name,
			"location" => $this->location,
			"depositFormula" => $this->deposit_formula,
			"serviceCharge" => $this->service_charge,
			"waterBillRate" => $this->water_bill_rate,
			"unitCount" => $this->unit_count,
			"createdAt" => $this->created_at,
		];
    }
}
