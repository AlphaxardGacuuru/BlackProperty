<?php

namespace App\Listeners;

use App\Events\DiscussionForumChatCreatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DiscussionForumChatCreatedListener
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
     * @param  \App\Events\DiscussionForumChatCreatedEvent  $event
     * @return void
     */
    public function handle(DiscussionForumChatCreatedEvent $event)
    {
        //
    }
}
