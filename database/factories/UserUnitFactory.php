<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserUnit>
 */
class UserUnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "user_id" => User::all()->random()->id,
			"occupied_at" => Carbon::now()->subMonth(2)->startOfMonth(),
			"created_by" => User::all()->random()->id,
        ];
    }
}
