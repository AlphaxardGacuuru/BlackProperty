<?php

namespace App\Listeners;

use App\Events\NewChatEvent;
use App\Notifications\NewChatNotification;

class NewChatListener
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
     * @param  \App\Events\NewChatEvent  $event
     * @return void
     */
    public function handle(NewChatEvent $event)
    {
        $event
            ->user
            ->notify(new NewChatNotification(
                $event->chat,
                $event->chat->user,
                $event->user
			));
    }
}
