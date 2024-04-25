<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class AcademicSessionResource extends JsonResource
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
            "courseId" => $this->course->id,
            "courseName" => $this->course->name,
            "year" => $this->year,
            "semester" => $this->semester,
            "startsAt" => $this->starts_at,
            "startsAtFormated" => Carbon::parse($this->starts_at)->format("d M Y"),
            "endsAt" => $this->ends_at,
            "endsAtFormated" => Carbon::parse($this->ends_at)->format("d M Y"),
        ];
    }
}
