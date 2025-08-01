<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Laravel\Telescope\IncomingEntry;
use Laravel\Telescope\Telescope;
use Laravel\Telescope\TelescopeApplicationServiceProvider;

class TelescopeServiceProvider extends TelescopeApplicationServiceProvider
{
	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		// Telescope::night();

		$this->hideSensitiveRequestDetails();

		$isLocal = $this->app->environment('local');

		Telescope::filter(function (IncomingEntry $entry) use ($isLocal) {
			return $isLocal ||
				$entry->isReportableException() ||
				$entry->isFailedRequest() ||
				$entry->isFailedJob() ||
				$entry->isScheduledTask() ||
				$entry->hasMonitoredTag();
		});
	}

	/**
	 * Prevent sensitive request details from being logged by Telescope.
	 */
	protected function hideSensitiveRequestDetails(): void
	{
		if ($this->app->environment('local')) {
			return;
		}

		Telescope::hideRequestParameters(['_token']);

		Telescope::hideRequestHeaders([
			'cookie',
			'x-csrf-token',
			'x-xsrf-token',
		]);
	}

	/**
	 * Register the Telescope gate.
	 *
	 * This gate determines who can access Telescope in non-local environments.
	 */
	protected function gate(): void
	{
		Gate::define('viewTelescope', function ($user = null) {
			return true;

			// Allow access in local environment
			if ($this->app->environment('local')) {
				return true;
			}

			// Allow specific authorized emails
			return in_array($user->email, [
				"alphaxardgacuuru47@gmail.com",
				"al@black.co.ke"
			]);
		});
	}
}
