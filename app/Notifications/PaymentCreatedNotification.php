<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentCreatedNotification extends Notification
{
    use Queueable;

	protected $payment;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($payment)
	{
		$this->payment = $payment;
	}

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
		return (new MailMessage)
			->from("al@black.co.ke", "Alphaxard from Black Property")
			->subject('Payment Received')
			->greeting('Hello ' . $notifiable->name . ',')
			->line('Your Payment of KES ' . number_format($this->payment->amount) . ' has been Received!')
			->action('View', url('/#/tenant/payments/{$this->payment->id}/show'))
			->line('Thank you for choosing Black Property!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
		return [
			"url" => "/#/tenant/dashboard",
			"from" => "",
			"message" => "Payment of KES " . number_format($this->payment->amount) . " received."
		];
    }
}
