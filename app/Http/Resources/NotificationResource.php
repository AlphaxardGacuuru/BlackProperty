<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            "type" => explode('\\', $this->type)[2],
            "notifiableType" => $this->notifiable_type,
            "notifiableId" => $this->notifiableId,
            "data" => $this->data,
            "url" => $this->data['url'] ?? null,
            "from" => $this->data['from'] ?? null,
            "message" => $this->data['message'] ?? null,
            "readAt" => $this->read_at,
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}
