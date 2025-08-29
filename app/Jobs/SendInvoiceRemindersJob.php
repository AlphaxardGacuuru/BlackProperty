<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Http\Services\InvoiceService;
use App\Models\Invoice;
use App\Models\User;
use App\Notifications\InvoiceRemindersSentNotifications;
use Illuminate\Support\Facades\Hash;

class SendInvoiceRemindersJob implements ShouldQueue
{
	use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	/**
	 * Create a new job instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{
		// Define Anonymous Class
		$result = new class {
			public $users;
			public $properties;
			public $units;
			public $invoices;
			public $message;
			public $isForAdmin;

			public function __construct()
			{
				$this->users = collect([]);
				$this->properties = collect([]);
				$this->units = collect([]);
				$this->invoices = collect([]);
				$this->message = "Invoice Reminders Sent Successfully.";
				$this->isForAdmin = true;
			}
		};

		Invoice::where("status", "!=", "paid")
			// Check that user of property has active subscription
			->whereHas("userUnit.unit.property.user", function ($query) {
				$query->whereHas("userSubscriptionPlans", function ($query) {
					$query->where("status", "active")
						->where("end_date", ">", now());
				});
			})
			->get()
			->each(function ($invoice) use (&$result) {
				$invoiceDay = $invoice->userUnit->unit->property->invoice_date;
				$invoiceReminderDuration = $invoice->userUnit->unit->property->invoice_reminder_duration;

				// Construct a new Carbon instance for the current month, setting the day to the invoice day
				$dateToCheck = now()->day($invoiceDay);

				// Check that the property's invoice date has passed by the reminder duration
				if ($dateToCheck->addDays($invoiceReminderDuration)->isFuture() || $invoice->status === "paid") {
					return;
				}

				[$saved, $message, $data] = (new InvoiceService)->sendReminder($invoice);

				$result->users->push($invoice->userUnit->unit->property->user);
				$result->properties->push($invoice->userUnit->unit->property);
				$result->units->push($invoice->userUnit->unit);
				$result->invoices->push($invoice);
			});

		$result->users = $result->users->unique()->values();
		$result->properties = $result->properties->unique()->values();
		$result->units = $result->units->unique()->values();
		$result->invoices = $result->invoices->unique()->values();

		// Send notifications to each user with their specific data
		foreach ($result->users as $user) {
			// Create a fresh copy for each user
			$userResult = new class {
				public $users;
				public $properties;
				public $units;
				public $invoices;
				public $message;
				public $isForAdmin;

				public function __construct()
				{
					$this->users = collect([]);
					$this->properties = collect([]);
					$this->units = collect([]);
					$this->invoices = collect([]);
					$this->message = "Invoice Reminders Sent Successfully.";
					$this->isForAdmin = false;
				}
			};

			// Set the current user
			$userResult->message = $result->message;

			// Get Users Properties
			$userResult->properties = $result
				->properties
				->filter(fn($property) => $property->user_id == $user->id)
				->values();

			// Get Users Units
			$propertyIds = $userResult
				->properties
				->map(fn($property) => $property->id)
				->unique();

			$userResult->units = $result
				->units
				->filter(function ($unit) use ($propertyIds) {
					return $propertyIds->contains($unit->property_id);
				})
				->values();

			$unitIds = $userResult
				->units
				->map(fn($unit) => $unit->id)
				->unique();

			$userResult->invoices = $result
				->invoices
				->filter(function ($invoice) use ($unitIds) {
					return $unitIds->contains($invoice->userUnit->unit->id);
				})
				->values();

			$user->notify(new InvoiceRemindersSentNotifications($userResult));
		}

		// Send Notification to Property Owners
		$superAdmin = User::firstOrCreate(
			["email" => "al@black.co.ke"],
			[
				'name' => 'Super Admin',
				'email' => 'al@black.co.ke',
				'email_verified_at' => now(),
				'avatar' => 'avatars/male-avatar.png',
				// 'phone' => '0700364446',
				'password' => Hash::make('al@black.co.ke'),
				// 'remember_token' => Str::random(10),
				'gender' => 'male',
			]
		);

		$superAdmin->notify(new InvoiceRemindersSentNotifications($result));

		return $result;
	}
}
