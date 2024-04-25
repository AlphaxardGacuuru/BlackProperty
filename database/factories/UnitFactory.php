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
        return [
            "name" => fake()->catchPhrase(),
            "description" => fake()->realText($maxNbChars = 20, $indexSize = 2),
            "credits" => rand(0, 9),
            "year" => rand(1, 4),
            "semester" => rand(1, 3),
        ];
    }
}
