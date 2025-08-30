<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReferralResource extends JsonResource
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
			"refererId" => $this->referer_id,
			"refererName" => $this->referer->name,
			"refereeId" => $this->referee_id,
			"refereeName" => $this->referee->name,
			"refereeEmail" => $this->referee->email,
			"refereePhone" => $this->referee->phone,
			"createdAt" => $this->created_at,
			"updatedAt" => $this->updated_at,
		];
    }
}
