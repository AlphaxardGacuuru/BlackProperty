<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserAdmissionResource extends JsonResource
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
			"tenantId" => $this->user_unit_id,
			"iprsId" => $this->iprsId,
			"propertyId" => $this->userUnit->unit->property->id,
			"firstName" => $this->first_name,
			"middleName" => $this->middle_name,
			"lastName" => $this->last_name,
			"nationalID" => $this->national_id,
			"email" => $this->email,
			"phone" => $this->phone,
			"gender" => $this->iprsRecord->gender,
			"citizenship" => $this->iprsRecord->citizenship,
			"dateOfBirth" => $this->iprsRecord->date_of_birth->format("d.m.Y"),
			"placeOfBirth" => $this->iprsRecord->place_of_birth,
			"idExpiryDate" => $this->iprsRecord->id_expiry_date->format("d.m.Y"),
			"propertyName" => $this->userUnit->unit->property->name,
			"unitName" => $this->userUnit->unit->name,
			"tenantName" => $this->userUnit->user->name,
			"status" => $this->status,
			"createdByName" => $this->createdBy->name,
			"createdAt" => $this->created_at,
		];
    }
}
