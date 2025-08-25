<?php

namespace App\Providers;

use App\Events\MpesaTransactionCreatedEvent;
use App\Events\ReferralCreatedEvent;
use Illuminate\Auth\Events\Registered;
use App\Listeners\MpesaTransactionCreatedListener;
use App\Listeners\ReferralCreatedListener;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [SendEmailVerificationNotification::class],
		MpesaTransactionCreatedEvent::class => [MpesaTransactionCreatedListener::class],
		ReferralCreatedEvent::class => [ReferralCreatedListener::class]

    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
