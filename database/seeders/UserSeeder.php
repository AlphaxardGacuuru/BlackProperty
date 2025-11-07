<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

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

		if ($superDoesntExist) {
			User::factory()->super()->create();
		}

		if ($alDoesntExist) {
			$user = User::factory()->al()->create();

			// Get Super Role
			$superRole = Role::where('name', 'Super Admin')->first();

			$user->syncRoles($superRole);
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
