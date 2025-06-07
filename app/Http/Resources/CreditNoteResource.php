<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CreditNoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
		$number = str_pad($this->id, 6, '0', STR_PAD_LEFT);
		$number = "CN-" . $number;

		return [
            "id" => $this->id,
            "number" => $number,
			"tenantName" => $this->userUnit->user->name,
            "unitId" => $this->userUnit->unit->id,
            "unitName" => $this->userUnit->unit->name,
			"userUnitId" => $this->user_unit_id,
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
