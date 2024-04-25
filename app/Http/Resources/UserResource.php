<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "email" => $this->email,
            "phone" => $this->phone,
            "gender" => $this->gender,
            "avatar" => $this->avatar,
            "accountType" => $this->account_type,
            "facultyId" => $this->faculty()?->id,
            "facultyName" => $this->faculty()?->name,
            "departmentId" => $this->department()?->id,
            "departmentName" => $this->department()?->name,
            "courseId" => $this->course()?->id,
            "courseName" => $this->course()?->name,
            "courseApprovedBy" => $this->courseApprovedBy(),
            "unitId" => $this->unit()?->id,
            "unitName" => $this->unit()?->name,
            "unitIds" => $this->units->map((fn($unit) => $unit->id)),
            "unitSessions" => $this->unitSessions(),
            "createdAt" => $this->created_at,
        ];
    }
}
