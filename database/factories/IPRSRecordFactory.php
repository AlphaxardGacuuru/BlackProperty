<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IPRSRecord>
 */
class IPRSRecordFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		$genders = ['MALE', 'FEMALE'];
		$maritalStatuses = ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'];
		$counties = ['NAIROBI', 'MOMBASA', 'KISUMU', 'NAKURU', 'ELDORET', 'KAKAMEGA', 'KISII', 'MERU'];
		$nationalities = ['KENYAN', 'UGANDAN', 'TANZANIAN', 'RWANDESE', 'BURUNDIAN'];

		$firstName = $this->faker->firstName();
		$lastName = $this->faker->lastName();
		$gender = Arr::random($genders);
		// Use Carbon directly for date generation
		$dateOfBirth = Carbon::now()->subYears(rand(10, 30))->startOfDay();
		$idIssueDate = (clone $dateOfBirth)->addYears(18)->startOfDay();
		$idExpiryDate = (clone $idIssueDate)->addYears(rand(1, 10))->startOfDay();

		return [
			'national_id' => $this->generateKenyanIDNumber(),
			'first_name' => $firstName,
			'middle_name' => $this->faker->boolean(70) ? $this->faker->firstName() : null,
			'last_name' => $lastName,
			'date_of_birth' => $dateOfBirth,
			'gender' => $gender,
			'citizenship' => 'KENYAN',
			'photo' => $this->faker->boolean(30) ? $this->generateBase64Image() : null,
			'marital_status' => Arr::random($maritalStatuses),
			'place_of_birth' => $this->faker->city(),
			'county_of_residence' => Arr::random($counties),
			'constituency' => $this->faker->word() . ' Constituency',
			'ward' => $this->faker->word() . ' Ward',
			'village' => $this->faker->word() . ' Village',
			'nationality' => Arr::random($nationalities),
			'id_issue_date' => $idIssueDate,
			'id_expiry_date' => $idExpiryDate,
			'verification_score' => $this->faker->randomFloat(2, 85, 100),
			'parent_details' => $this->generateParentDetails($firstName, $lastName, $gender),
			'biometric_data' => $this->generateBiometricData(),
		];
	}

	/**
	 * Generate a Kenyan ID number format
	 */
	private function generateKenyanIDNumber(): string
	{
		// Kenyan ID format: 8 digits
		return str_pad((string) $this->faker->numberBetween(10000000, 39999999), 8, '0', STR_PAD_LEFT);
	}

	/**
	 * Generate mock parent details
	 */
	private function generateParentDetails(string $firstName, string $lastName, string $gender): array
	{
		$fatherLastName = $this->faker->boolean(80) ? $lastName : $this->faker->lastName();
		$motherLastName = $this->faker->boolean(60) ? $lastName : $this->faker->lastName();

		return [
			[
				'type' => 'FATHER',
				'name' => $this->faker->firstNameMale() . ' ' . $fatherLastName,
				'national_id' => $this->generateKenyanIDNumber()
			],
			[
				'type' => 'MOTHER',
				'name' => $this->faker->firstNameFemale() . ' ' . $motherLastName,
				'national_id' => $this->generateKenyanIDNumber()
			]
		];
	}

	/**
	 * Generate mock biometric data
	 */
	private function generateBiometricData(): array
	{
		return [
			'fingerprints' => [
				'right_thumb' => $this->faker->boolean(50) ? 'base64_fingerprint_data_' . $this->faker->sha256() : null,
				'left_thumb' => $this->faker->boolean(50) ? 'base64_fingerprint_data_' . $this->faker->sha256() : null,
			],
			'signature' => $this->faker->boolean(40) ? 'base64_signature_data_' . $this->faker->sha256() : null
		];
	}

	/**
	 * Generate a simple base64 encoded placeholder image
	 */
	private function generateBase64Image(): string
	{
		// Simple 1x1 pixel transparent PNG in base64
		return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
	}

	/**
	 * Configure the model factory for specific genders
	 */
	public function male(): static
	{
		return $this->state(fn(array $attributes) => [
			'gender' => 'MALE',
			'first_name' => $this->faker->firstNameMale(),
		]);
	}

	public function female(): static
	{
		return $this->state(fn(array $attributes) => [
			'gender' => 'FEMALE',
			'first_name' => $this->faker->firstNameFemale(),
		]);
	}

	/**
	 * Configure for specific counties
	 */
	public function forCounty(string $county): static
	{
		return $this->state(fn(array $attributes) => [
			'county_of_residence' => $county,
			'place_of_birth' => $county,
		]);
	}

	/**
	 * Configure for specific age range
	 */
	public function age(int $age): static
	{
		$birthDate = now()->subYears($age);

		return $this->state(fn(array $attributes) => [
			'date_of_birth' => $birthDate,
			'id_issue_date' => (clone $birthDate)->addYears(18)->startOfDay(),
		]);
	}
}
