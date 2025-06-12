<?php

namespace App\Listeners;

use App\Events\MpesaReceivedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class MpesaReceivedListener
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
     * @param  \App\Events\MpesaReceivedEvent  $event
     * @return void
     */
    public function handle(MpesaReceivedEvent $event)
    {
        //
    }
}
