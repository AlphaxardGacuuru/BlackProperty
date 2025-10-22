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
			"emailVerifiedAt" => $this->email_verified_at,
			"settings" => $this->settings,
			"propertyIds" => $this->properties->map(fn($property) => $property->id),
			"assignedPropertyIds" => $this->userProperties->map(fn($userProperty) => $userProperty->property_id),
			"activeSubscription" => $this->activeSubscription(),
			"subscriptionByPropertyIds" => $this->subscriptionByPropertyIds(),
			"permissions" => $this->userProperties
				->flatMap(function ($userProperty) {
					return $userProperty
						->getAllPermissions()
						->pluck('name')
						->unique()
						->values();
				}),
			"createdAt" => $this->created_at,
		];
	}
}
