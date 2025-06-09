<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionPlanResource extends JsonResource
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
			'id' => $this->id,
			'name' => $this->name,
			'description' => $this->description,
			'amount' => $this->amount,
			'currency' => $this->currency,
			'price' => $this->price,
			'features' => json_decode($this->features),
			'createdAt' => $this->created_at,
		];
    }
}
