<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
        $number = "I-" . $number;

        $waterReading = $this->userUnit
            ->waterReadings()
            ->where("month", $this->month)
            ->where("year", $this->year)
            ->first()
            ?->reading;

        $waterUsage = $this->userUnit
            ->waterReadings()
            ->where("month", $this->month)
            ->where("year", $this->year)
            ->first()
            ?->usage;

        return [
            "id" => $this->id,
            "number" => $number,
            "userUnitId" => $this->user_unit_id,
            "tenantId" => $this->userUnit->user_id,
            "tenantName" => $this->userUnit->user->name,
            "tenantPhone" => $this->userUnit->user->phone,
            "tenantEmail" => $this->userUnit->user->email,
            "unitId" => $this->userUnit->unit_id,
            "unitName" => $this->userUnit->unit->name,
            "waterReading" => $waterReading,
            "waterUsage" => $waterUsage,
            "type" => $this->type,
            "amount" => number_format($this->amount),
            "paid" => number_format($this->paid),
            "balance" => number_format($this->balance),
            "status" => $this->status,
            "month" => $this->month,
            "year" => $this->year,
            "emailsSent" => $this->emails_sent,
            "smsesSent" => $this->smses_sent,
            "updatedAt" => $this->updatedAt,
            "createdAt" => $this->createdAt,
        ];
    }
}
