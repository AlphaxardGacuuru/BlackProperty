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
            ->deposit_factor;

        // Replace 'r' in the formula with rent
        $rent = str_replace('r', $rent, $formula);

        // Evaluate the formula
        $rent = eval("return $rent;");

        return [
            "id" => $this->id,
            "propertyId" => $this->property_id,
            "name" => $this->name,
            "rent" => number_format($this->rent),
            "deposit" => number_format($this->deposit),
            "type" => $this->type,
            "bedrooms" => $this->bedrooms,
            "size" => $this->size,
            "tenantId" => $this->currentTenant()?->id,
            "tenantAvatar" => $this->currentTenant()?->avatar,
            "tenantName" => $this->currentTenant()?->name,
            "tenantEmail" => $this->currentTenant()?->email,
            "tenantPhone" => $this->currentTenant()?->phone,
            "tenantGender" => $this->currentTenant()?->gender,
            "tenantOccupiedAt" => $this->currentUserUnit()?->occupied_at,
        ];
    }
}
