<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "name" => "",
            "description" => fake()->realTextBetween($minNbChars = 160, $maxNbChars = 200, $indexSize = 2),
			"duration" => rand(0, 9),
			"price" => rand(0, 9) * 10000,
            'created_at' => Carbon::now()->subDay(rand(3, 12)),
        ];
    }
}
