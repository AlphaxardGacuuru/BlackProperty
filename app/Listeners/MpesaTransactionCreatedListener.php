<?php

namespace App\Listeners;

use App\Events\MpesaTransactionCreatedEvent;
use App\Notifications\MpesaTransactionCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class MpesaTransactionCreatedListener
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
     * @param  \App\Events\MpesaTransactionCreatedEvent  $event
     * @return void
     */
    public function handle(MpesaTransactionCreatedEvent $event)
    {
        $event
		->mpesaTransaction
		->user
		->notify(new MpesaTransactionCreatedNotification($event->mpesaTransaction));
    }
}
