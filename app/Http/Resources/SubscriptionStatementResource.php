<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionStatementResource extends JsonResource
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
			"type" => $this->type,
			"credit" => number_format($this->credit ?? 0),
			"debit" => number_format($this->debit ?? 0),
			"balance" => number_format($this->balance ?? 0),
			"updatedAt" => $this->updated_at,
			"createdAt" => $this->created_at,
		];
    }
}
