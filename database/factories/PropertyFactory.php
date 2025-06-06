<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		return [
			"name" => fake()->streetName(),
			"user_id" => User::all()->random()->id,
			"location" => fake()->city(),
			"deposit_formula" => "r*2+2000",
			"unit_count" => rand(5, 20),
			"service_charge" => rand(2000, 20000),
			"water_bill_rate" => [
				"council" => fake()->randomFloat(2, 1, 4),
				"borehole" => fake()->randomFloat(2, 1, 4),
				"tanker" => fake()->randomFloat(2, 1, 4),
			]
		];
	}
}
