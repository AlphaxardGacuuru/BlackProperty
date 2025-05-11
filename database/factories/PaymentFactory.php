<?php

namespace Database\Factories;

use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		$channels = ["Bank", "Mpesa"];

		$code = Payment::count() + 1;
		$code = str_pad($code, 6, '0', STR_PAD_LEFT);
		$code = "P-" . $code;

		return [
			"code" => $code,
			"amount" => "amount",
			// "transaction_reference" => fake()->regexify('[A-Z0-9]{10}'),
			"channel" => $channels[rand(0, 1)],
			"paid_on" => "paidOn",
			"created_by" => Carbon::now()->timestamp,
		];
	}
}
