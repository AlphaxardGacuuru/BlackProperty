<?php

namespace Database\Factories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $types = ["rent", "water", "service_charge"];

		$code = Invoice::count() + 1;
		$code = str_pad($code, 6, '0', STR_PAD_LEFT);
		$code = "I-" . $code;
		
        return [
            "user_unit_id" => "userUnitId",
            "code" => $code,
            "type" => "rent",
            "amount" => "amount",
            "balance" => "amount",
            "month" => "month",
            "year" => "year",
            "created_by" => "this->id",
        ];
    }
}
