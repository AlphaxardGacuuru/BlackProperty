<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$superDoesntExist = User::where('email', 'al@black.co.ke')
			->doesntExist();

		$alDoesntExist = User::where('email', 'alphaxardgacuuru47@gmail.com')
			->doesntExist();

		$gacuuruDoesntExist = User::where('email', 'gacuuruwakarenge@gmail.com')
			->doesntExist();

		$cikuDoesntExist = User::where('email', 'cikumuhandi@gmail.com')
			->doesntExist();

		if (app()->environment('production')) {
			if ($alDoesntExist) {
				User::factory()->al()->create();
			}
		}

		if (app()->environment('local')) {
			if ($superDoesntExist) {
				User::factory()->super()->create();
			}

			if ($gacuuruDoesntExist) {
				User::factory()->gacuuru()->create();
			}

			if ($cikuDoesntExist) {
				User::factory()->ciku()->create();
			}

			User::factory()->count(50)->create();
		}
	}
}
