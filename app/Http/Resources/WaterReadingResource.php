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
            "tenantName" => $this->userUnit->user->name,
            "unitName" => $this->userUnit->unit->name,
            "reading" => $this->reading,
            "usage" => $this->usage,
            "bill" => number_format($this->bill),
            "month" => $this->month,
            "year" => $this->year,
            "updated_at" => $this->updated_at,
            "created_at" => $this->created_at,
        ];
    }
}
