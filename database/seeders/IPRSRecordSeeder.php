<?php

namespace Database\Seeders;

use App\Models\IPRSRecord;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IPRSRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
	{
		// Create 10 random IPRS records
		IPRSRecord::factory()->count(10)->create();

		// Create specific demographic examples
		IPRSRecord::factory()->count(10)->male()->create();
		IPRSRecord::factory()->count(10)->female()->create();

		// Create records for specific counties
		IPRSRecord::factory()->count(5)->forCounty('NAIROBI')->create();
		IPRSRecord::factory()->count(5)->forCounty('MOMBASA')->create();

		// Create records for specific age groups
		IPRSRecord::factory()->count(5)->age(25)->create();
		IPRSRecord::factory()->count(5)->age(40)->create();
		IPRSRecord::factory()->count(5)->age(50)->create();

		// Create a specific known record for testing
		IPRSRecord::factory()->create([
			'national_id' => '12345678',
			'first_name' => 'JOHN',
			'middle_name' => 'KIPTOO',
			'last_name' => 'KIMANI',
			'date_of_birth' => '1985-05-15',
			'gender' => 'MALE',
			'citizenship' => 'KENYAN',
			'marital_status' => 'MARRIED',
			'place_of_birth' => 'NAIROBI',
			'county_of_residence' => 'NAIROBI',
			'constituency' => 'WESTLANDS',
			'ward' => 'KARURA',
			'village' => 'MWIMUTI',
			'nationality' => 'KENYAN',
			'id_issue_date' => '2010-10-22',
			'id_expiry_date' => '2030-10-22',
			'verification_score' => 98.5,
			'parent_details' => [
				[
					'type' => 'FATHER',
					'name' => 'SAMUEL KIMANI',
					'national_id' => '11111111'
				],
				[
					'type' => 'MOTHER',
					'name' => 'MARY WANJIKU',
					'national_id' => '22222222'
				]
			],
			'biometric_data' => [
				'fingerprints' => [
					'right_thumb' => 'base64_encoded_right_thumb_data',
					'left_thumb' => 'base64_encoded_left_thumb_data'
				],
				'signature' => 'base64_encoded_signature_data'
			]
		]);
	}
}
