<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
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
            "name" => $this->name,
            "code" => $this->code,
            "description" => $this->description,
            "year" => $this->year,
            "semester" => $this->semester,
            "credits" => $this->credits,
            "courseId" => $this->course_id,
            "materials" => $this->materials,
            "instructors" => $this->instructors(),
            "students" => $this->students(),
        ];
    }
}
