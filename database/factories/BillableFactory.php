<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Billable>
 */
class BillableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "name" => "Admission Fee",
            "description" => "Admission Fee",
            "price" => 2000,
            "year" => 1,
            "semester" => 1,
        ];
    }
}
