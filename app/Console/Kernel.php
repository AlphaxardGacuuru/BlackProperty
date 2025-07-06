<?php

namespace App\Console;

use App\Jobs\GenerateInvoicesJob;
use App\Jobs\SendInvoiceRemindersJob;
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

		$schedule->command('telescope:prune')->weekly();

		$schedule
			->job(new GenerateInvoicesJob)
			// ->everyMinute()
			->dailyAt("08:00")
			// ->emailOutputTo("al@black.co.ke")
			->emailOutputOnFailure("al@black.co.ke")
			->onSuccess(function () {
				Log::info("GenerateInvoicesJob completed successfully.");
			})
			->onFailure(function () {
				Log::error("GenerateInvoicesJob failed.");
			});

		$schedule
			->job(new SendInvoiceRemindersJob)
			// ->everyMinute()
			->dailyAt("08:00")
			// ->emailOutputTo("al@black.co.ke")
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
