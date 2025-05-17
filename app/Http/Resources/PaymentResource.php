<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		$number = str_pad($this->id, 6, '0', STR_PAD_LEFT);
		$number = "P-" . $number;

		return [
			"id" => $this->id,
            "number" => $number,
			"tenantName" => $this->userUnit->user->name,
			"tenantEmail" => $this->userUnit->user->email,
			"tenantPhone" => $this->userUnit->user->phone,
			"unitId" => $this->userUnit->unit->id,
			"unitName" => $this->userUnit->unit->name,
			"channel" => $this->channel,
			"transactionReference" => $this->transaction_reference,
			"amount" => number_format($this->amount),
			"month" => $this->month,
			"year" => $this->year,
			"updatedAt" => $this->updatedAt,
			"createdAt" => $this->createdAt,
		];
	}
}
