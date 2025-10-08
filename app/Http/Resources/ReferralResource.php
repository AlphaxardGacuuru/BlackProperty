<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReferralResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
		$totalIncome = $this->referee->userSubscriptionPlans()->sum('amount_paid');
		$totalPayouts = $this->referee->referralPayouts()->sum('amount');
		$balance = $totalIncome - $totalPayouts;

        return [
			"id" => $this->id,
			"refererId" => $this->referer_id,
			"refererName" => $this->referer->name,
			"refereeId" => $this->referee_id,
			"refereeAvatar" => $this->referee->avatar,
			"refereeName" => $this->referee->name,
			"refereeEmail" => $this->referee->email,
			"refereePhone" => $this->referee->phone,
			"commission" => $this->commission,
			"totalIncome" => (int) $totalIncome,
			"balance" => $balance,
			"createdAt" => $this->created_at,
			"updatedAt" => $this->updated_at,
		];
    }
}
