<?php

namespace Database\Factories;

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
            "location" => fake()->city(),
            "deposit_formula" => "r*2+2000",
            "unit_count" => rand(5, 20),
            "service_charge" => rand(2000, 20000),
			"water_bill_rate" => rand(200, 500)
        ];
    }
}
