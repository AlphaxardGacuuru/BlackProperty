<?php

namespace App\Listeners;

use App\Events\AnnouncementCreatedEvent;
use App\Notifications\AnnouncementNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AnnouncementCreatedListener
{
	/**
	 * Create the event listener.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
	}

	/**
	 * Handle the event.
	 *
	 * @param  \App\Events\AnnouncementCreatedEvent  $event
	 * @return void
	 */
	public function handle(AnnouncementCreatedEvent $event)
	{
		$event
			->announcement
			->announcementUserUnits
			->each(function ($announcementUserUnits) use ($event) {
				$announcementUserUnits
					->userUnit
					->user
					->notify(new AnnouncementNotification($event->announcement));
			});
	}
}
