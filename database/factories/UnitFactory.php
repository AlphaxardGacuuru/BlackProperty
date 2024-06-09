<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $block = ["A", "B", "C", "D", "E", "F", "G"];

        return [
            "name" => $block[rand(0, 6)] . rand(0, 20),
            "rent" => rand(8, 100) * 1000,
            "deposit" => ((rand(8, 100) * 1000) * 2) + 2000,
            "type" => "apartment",
			"bedrooms" => rand(1, 4)
        ];
    }
}
