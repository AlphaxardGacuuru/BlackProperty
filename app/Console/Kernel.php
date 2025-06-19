<?php

namespace App\Console;

use App\Jobs\GenerateInvoicesJob;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
	/**
	 * Define the application's command schedule.
	 *
	 * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
	 * @return void
	 */
	protected function schedule(Schedule $schedule)
	{
		// $schedule->command('inspire')->hourly();

		$schedule
			->job(new GenerateInvoicesJob)
			->everyMinute()
			// ->daily()
			->emailOutputOnFailure("al@black.co.ke")
			->onSuccess(function () {
				Log::info("GenerateInvoicesJob completed successfully.");
			})
			->onFailure(function () {
				Log::error("GenerateInvoicesJob failed.");
			});
	}

	/**
	 * Register the commands for the application.
	 *
	 * @return void
	 */
	protected function commands()
	{
		$this->load(__DIR__ . '/Commands');

		require base_path('routes/console.php');
	}
}
