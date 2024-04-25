<?php

namespace App\Providers;

use App\Events\DiscussionForumChatCreatedEvent;
use App\Events\NewChatEvent;
use App\Listeners\DiscussionForumChatCreatedListener;
use App\Listeners\NewChatListener;
use Illuminate\Auth\Events\Registered;
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
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        DiscussionForumChatCreatedEvent::class => [DiscussionForumChatCreatedListener::class],
        NewChatEvent::class => [NewChatListener::class],
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
