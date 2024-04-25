<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InstructorResource extends JsonResource
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
            "avatar" => $this->avatar,
            "email" => $this->email,
            "phone" => $this->phone,
            "gender" => $this->gender,
            "education" => $this->education,
            "originLocation" => $this->origin_location,
            "currentLocation" => $this->current_location,
            "facultyId" => $this->faculty()?->id,
            "facultyName" => $this->faculty()?->name,
            "departmentId" => $this->department()?->id,
            "departmentName" => $this->department()?->name,
            "courseId" => $this->course()?->id,
            "courseName" => $this->course()?->name,
            "courseIds" => $this->courses->map((fn($course) => $course->id)),
            "createdAt" => $this->created_at,
        ];
    }
}
