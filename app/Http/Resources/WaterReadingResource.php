<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WaterReadingResource extends JsonResource
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
			"unitName" => $this->userUnit->unit->name,
			"reading" => $this->reading,
			"month" => $this->month,
			"year" => $this->year,
			"updated_at" => $this->updated_at,
			"created_at" => $this->created_at,
		];
    }
}
