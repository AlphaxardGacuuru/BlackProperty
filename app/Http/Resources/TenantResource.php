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
            "unitId" => $this->unit_id,
            "propertyId" => $this->unit->property->id,
            "name" => $this->user->name,
            "email" => $this->user->email,
            "phone" => $this->user->phone,
            "gender" => $this->user->gender,
            "avatar" => $this->user->avatar,
            "vacatedAt" => $this->vacated_at ?? "occupied",
            "createdAt" => $this->created_at,
        ];
    }
}
