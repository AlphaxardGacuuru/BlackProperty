<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserSubscriptionPlanResource extends JsonResource
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
			"subscriptionPlanId" => $this->subscription_plan_id,
			"amountPaid" => $this->amount_paid,
			"startDate" => $this->start_date,
			"endDate" => $this->end_date,
			"status" => $this->status,
			"billingCycle" => $this->billing_cycle,
			"createdAt" => $this->created_at,
			"updatedAt" => $this->updated_at,
		];
    }
}
