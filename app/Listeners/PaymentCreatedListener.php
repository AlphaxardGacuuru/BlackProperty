<?php

namespace App\Listeners;

use App\Events\PaymentCreatedEvent;
use App\Notifications\PaymentCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PaymentCreatedListener
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
	 * @param  \App\Events\PaymentCreatedEvent  $event
	 * @return void
	 */
	public function handle(PaymentCreatedEvent $event)
	{
		$event
			->payment
			->userUnit
			->user
			->notify(new PaymentCreatedNotification($event->payment));
	}
}
