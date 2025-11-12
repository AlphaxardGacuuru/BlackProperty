<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Notifications\PaymentCreatedNotification;
use Illuminate\Console\Command;
use Illuminate\Notifications\Messages\VonageMessage;
use Illuminate\Support\Facades\Notification;

class TestSMSCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'test:sms {user_id} {--phone=}';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Test SMS notifications via Vonage';

	/**
	 * Execute the console command.
	 *
	 * @return int
	 */
	public function handle()
	{
		$userId = $this->argument('user_id');
		$testPhone = $this->option('phone');

		$user = User::find($userId);

		if (!$user) {
			$this->error("User with ID {$userId} not found.");
			return 1;
		}

		// Display user info
		$this->info("User: {$user->name}");
		$this->info("Email: {$user->email}");
		$this->info("Phone: " . ($user->phone ?? 'No phone number'));

		// Check Vonage config
		$this->info("\nVonage Configuration:");
		$this->info("Key: " . (config('services.vonage.key') ? 'Set' : 'Not set'));
		$this->info("Secret: " . (config('services.vonage.secret') ? 'Set' : 'Not set'));
		$this->info("SMS From: " . (config('services.vonage.sms_from') ?? 'Not set'));

		// Test phone number format
		$phoneToUse = $testPhone ?? $user->phone;

		if (!$phoneToUse) {
			$this->error("No phone number available for testing.");
			return 1;
		}

		$this->info("Phone to use: {$phoneToUse}");

		// Create a test notification
		try {
			$this->info("\nSending test SMS...");

			Notification::route('vonage', $phoneToUse)
				->notify(new class extends \Illuminate\Notifications\Notification {
					public function via($notifiable)
					{
						return ['vonage'];
					}

					public function toVonage($notifiable)
					{
						return (new VonageMessage)
							->content('Test SMS from Black Property system. If you receive this, SMS is working!')
							->from(config('services.vonage.sms_from'));
					}
				});

			$this->info("SMS sent successfully!");
		} catch (\Exception $e) {
			$this->error("Failed to send SMS: " . $e->getMessage());
			$this->error("Stack trace: " . $e->getTraceAsString());
			return 1;
		}

		return 0;
	}
}
