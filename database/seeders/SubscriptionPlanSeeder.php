<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		SubscriptionPlan::updateOrCreate(
			['name' => 'BP 20'],
			[
				'name' => 'BP 20',
				'description' => '20 units or Less',
				'price' => [
					"onboarding_fee" => 5000,
					"monthly" => 2000,
					"yearly" => 20000,
				],
				'features' => json_encode([
					'Property Management',
					'Occupancy Management',
					'Billing',
					'Water Management',
					'Tenant Management',
					'Staff Management',
				]),
				'max_properties' => 1,
				'max_units' => 20,
				'max_users' => 1,
			]
		);

		SubscriptionPlan::updateOrCreate(
			['name' => 'BP 50'],
			[
				'name' => 'BP 50',
				'description' => 'Between 21 - 50 units',
				'price' => [
					"onboarding_fee" => 10000,
					"monthly" => 5000,
					"yearly" => 50000,
				],
				'features' => json_encode([
					'Property Management',
					'Occupancy Management',
					'Billing',
					'Water Management',
					'Tenant Management',
					'Staff Management',
				]),
				'max_properties' => 1,
				'max_units' => 50,
				'max_users' => 1,
			]
		);

		SubscriptionPlan::updateOrCreate(
			['name' => 'BP 100'],
			[
				'name' => 'BP 100',
				'description' => 'Betwee 51 - 100 units',
				'price' => [
					"onboarding_fee" => 20000,
					"monthly" => 10000,
					"yearly" => 100000,
				],
				'features' => json_encode([
					'Property Management',
					'Occupancy Management',
					'Billing',
					'Water Management',
					'Tenant Management',
					'Staff Management',
				]),
				'max_properties' => 1,
				'max_units' => 100,
				'max_users' => 100,
			]
		);

		SubscriptionPlan::updateOrCreate(
			['name' => 'BP 200'],
			[
				'name' => 'BP 200',
				'description' => 'Between 101 - 200 units',
				'price' => [
					"onboarding_fee" => 30000,
					"monthly" => 20000,
					"yearly" => 200000,
				],
				'features' => json_encode([
					'Property Management',
					'Occupancy Management',
					'Billing',
					'Water Management',
					'Tenant Management',
					'Staff Management',
				]),
				'max_properties' => 1,
				'max_units' => 200,
				'max_users' => 200,
			]
		);
	}
}
