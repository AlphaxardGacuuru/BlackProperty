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
            "name" => fake()->secondaryAddress(),
            "location" => fake()->city() . ", " . fake()->streetName(),
            "deposit_formula" => "r*2+2000",
            "unit_count" => rand(5, 20),
        ];
    }
}
