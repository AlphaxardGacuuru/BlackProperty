<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
		// Force all generated URLs to use your APP_URL
		URL::forceRootUrl(config('app.url'));
		
		if (env('APP_ENV') !== 'local') {
			URL::forceScheme('https');
		}
	}
}
