<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $rent = $this->rent;

        $formula = $this->property()
            ->first()
            ->deposit_formula;

        // Replace 'r' in the formula with rent
        $rent = str_replace('r', $rent, $formula);

        // Evaluate the formula
        $rent = eval("return $rent;");

		$currentTenant = $this->currentTenant();

		$currentUserUnit = $this->currentUserUnit();

        return [
            "id" => $this->id,
            "propertyId" => $this->property_id,
			"propertyName" => $this->property->name,
            "name" => $this->name,
            "rent" => number_format($this->rent),
            "deposit" => number_format($this->deposit),
			"serviceCharge" => $this->service_charge,
            "type" => $this->type,
            "bedrooms" => $this->bedrooms,
            "size" => $this->size,
            "ensuite" => $this->ensuite,
            "dsq" => $this->dsq,
            "status" => $this->status,
            "tenantId" => $currentTenant?->id,
            "tenantAvatar" => $currentTenant?->avatar,
            "tenantName" => $currentTenant?->name,
            "tenantEmail" => $currentTenant?->email,
            "tenantPhone" => $currentTenant?->phone,
            "tenantGender" => $currentTenant?->gender,
            "tenantOccupiedAt" => $currentUserUnit?->occupied_at,
			"currentUserUnitId" => $currentUserUnit?->id,
        ];
    }
}
