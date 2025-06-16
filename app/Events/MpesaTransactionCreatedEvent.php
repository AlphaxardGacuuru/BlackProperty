<?php

namespace App\Events;

use App\Models\MPESATransaction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MpesaTransactionCreatedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

	public $mpesaTransaction;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(MPESATransaction $mpesaTransaction)
    {
		$this->mpesaTransaction = $mpesaTransaction; 
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('mpesa-transaction-created.' . $this->mpesaTransaction->user_id);
    }
}
