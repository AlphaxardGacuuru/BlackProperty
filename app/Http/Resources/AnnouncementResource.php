<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncementResource extends JsonResource
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
			"message" => $this->message,
			"channels" => $this->channels,
			"tenants" => $this
				->announcementUserUnits
				->map(fn($announcementUserUnits) => $announcementUserUnits->userUnit->user->name),
			"createdAt" => $this->created_at,
			"updatedAt" => $this->updated_at,
		];
	}
}
