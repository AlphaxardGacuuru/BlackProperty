<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run()
	{
		if (config("app.env") == "production") {
			$this->call([
				SubscriptionPlanSeeder::class,
			]);
		} else {
			$this->call([
				SubscriptionPlanSeeder::class,
				UserSeeder::class,
				PropertySeeder::class,
				// UnitSeeder::class,
				StaffSeeder::class,
				TenantSeeder::class,
				RoleSeeder::class,
				WaterReadingSeeder::class,
				InvoiceSeeder::class
			]);
		}
	}
}
