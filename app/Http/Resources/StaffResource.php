<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
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
            "userId" => $this->user->id,
            "name" => $this->user->name,
            "avatar" => $this->user->avatar,
            "email" => $this->user->email,
            "phone" => $this->user->phone,
            "gender" => $this->user->gender,
            "propertyId" => $this->property_id,
			"roles" => $this->roles,
            "roleNames" => $this->getRoleNames(),
            "permissions" => $this->getPermissionNames(),
            "createdAt" => $this->created_at
        ];
    }
}
