<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialResource extends JsonResource
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
            "title" => $this->title,
            "description" => $this->description,
            "week" => $this->week,
            "startsAt" => $this->starts_at,
            "startsAtFormatted" => Carbon::parse($this->starts_at)->format('d M Y'),
            "endsAt" => $this->ends_at,
            "endsAtFormatted" => Carbon::parse($this->ends_at)->format('d M Y'),
            "type" => $this->type,
            "richText" => $this->rich_text,
            "unitId" => $this->unit_id,
            "createdAt" => $this->created_at,
        ];
    }
}
