<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DiscussionForumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // Current User ID
        $auth = auth('sanctum')->user();

        $id = $auth ? $auth->id : 0;

        // Get rating
        $hasRated = $this->hasRated($id);

        return [
            "id" => $this->id,
            "sessionId" => $this->academic_session_id,
            "unitId" => $this->unit_id,
            "week" => $this->week,
            "userId" => $this->user_id,
            "userName" => $this->user->name,
            "userType" => $this->user->account_type,
            "avatar" => $this->user->avatar,
            "text" => $this->text,
            "attachment" => $this->attachment,
			"rating" => $this->rating(),
			"ratings" => $this->ratings,
            "hasRated" => $hasRated ? $hasRated->rating : 0,
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
