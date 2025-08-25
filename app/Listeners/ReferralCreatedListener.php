<?php

namespace App\Listeners;

use App\Events\ReferralCreatedEvent;
use App\Notifications\ReferralSavedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ReferralCreatedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
		
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ReferralCreatedEvent  $event
     * @return void
     */
    public function handle(ReferralCreatedEvent $event)
    {
		$event
			->referral
			->referer
			->notify(new ReferralSavedNotification($event->referral));
    }
}
