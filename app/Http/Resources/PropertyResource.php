<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
	public function addOrdinalSuffix($number)
	{
		$number = intval($number);

		// Handle special cases for 11ᵗʰ, 12ᵗʰ, 13ᵗʰ
		if ($number % 100 >= 11 && $number % 100 <= 13) {
			return $number . 'ᵗʰ';
		}

		// Determine the last digit
		switch ($number % 10) {
			case 1:
				return $number . 'ˢᵗ';
			case 2:
				return $number . 'ⁿᵈ';
			case 3:
				return $number . 'ʳᵈ';
			default:
				return $number . 'ᵗʰ';
		}
	}

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
			"location" => $this->location,
			"depositFormula" => $this->deposit_formula,
			"serviceCharge" => number_format($this->service_charge),
			"waterBillRateCouncil" => $this->water_bill_rate["council"],
			"waterBillRateBorehole" => $this->water_bill_rate["borehole"],
			"waterBillRateTanker" => $this->water_bill_rate["tanker"],
			"unitCount" => $this->unit_count,
			"invoiceDate" => $this->addOrdinalSuffix($this->invoice_date),
			"email" => $this->email ?? false,
			"sms" => $this->sms ?? false,
			"createdAt" => $this->created_at,
		];
	}
}
