<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionResource extends JsonResource
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
            "userId" => $this->user_id,
			"userName" => $this->user->name,
			"userAvatar" => $this->user->avatar,
            "academicSessionId" => $this->academic_session_id,
            "unitId" => $this->unit_id,
            "week" => $this->week,
            "type" => $this->type,
            "attachment" => $this->attachment,
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
		];
    }
}
