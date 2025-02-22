<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    public function addOrdinalSuffix($number)
    {
        $number = intval($number);

        // Handle special cases for 11th, 12th, 13th
        if ($number % 100 >= 11 && $number % 100 <= 13) {
            return $number . 'th';
        }

        // Determine the last digit
        switch ($number % 10) {
            case 1:
                return $number . 'st';
            case 2:
                return $number . 'nd';
            case 3:
                return $number . 'rd';
            default:
                return $number . 'th';
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
            "serviceCharge" => $this->service_charge,
            "waterBillRate" => $this->water_bill_rate,
            "unitCount" => $this->unit_count,
            "invoiceDate" => $this->addOrdinalSuffix($this->invoice_date),
            "email" => $this->email ?? false,
            "sms" => $this->sms ?? false,
            "createdAt" => $this->created_at,
        ];
    }
}
