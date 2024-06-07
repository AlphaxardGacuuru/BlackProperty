<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TenantResource extends JsonResource
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
            "id" => $this->user->id,
            "userUnitId" => $this->id,
            "unitId" => $this->unit_id,
            "unitName" => $this->unit->name,
            "propertyId" => $this->unit->property->id,
            "name" => $this->user->name,
            "email" => $this->user->email,
            "phone" => $this->user->phone,
            "gender" => $this->user->gender,
            "avatar" => $this->user->avatar,
            "occupiedAt" => $this->occupied_at,
            "vacatedAt" => $this->vacated_at ?? "occupied",
            "createdAt" => $this->created_at,
        ];
    }
}
