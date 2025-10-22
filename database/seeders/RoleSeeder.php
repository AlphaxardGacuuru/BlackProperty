<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$roles = collect([
			"Super Admin", 
			"Admin", 
			"Property Manager", 
			"Unit Manager",
			"Tenant Manager",
			"Invoice Manager",
			"Payments Manager",
			"Credit Notes Manager",
			"Deductions Manager",
			"Emails Manager",
			"SMSs Manager",
		]);

		$roles->each(function ($role) {
			Role::firstOrCreate(
				["name" => $role],
				["guard_name" => "web"]
			);
		});
    }
}
