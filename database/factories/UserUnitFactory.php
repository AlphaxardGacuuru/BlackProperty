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
		$users = User::whereNotIn("email", [
			"alphaxardgacuuru47@gmail.com",
			"al@black.co.ke",
			"gacuuruwakarenge@gmail.com",
			"cikumuhandi@gmail.com"
		])->get();

		return [
			"user_id" => $users->random()->id,
			"occupied_at" => Carbon::now()->subMonth(2)->startOfMonth(),
			"created_by" => User::all()->random()->id,
		];
	}
}
