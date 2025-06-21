<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvoicesGeneratedNotification extends Notification
{
	use Queueable;

	protected $result;

	/**
	 * Create a new notification instance.
	 *
	 * @return void
	 */
	public function __construct($result)
	{
		$this->result = $result;
	}

	/**
	 * Get the notification's delivery channels.
	 *
	 * @param  mixed  $notifiable
	 * @return array
	 */
	public function via($notifiable)
	{
		return ['mail', 'database'];
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
			->greeting('Hello ' . $notifiable->name . ',')
			->subject('Invoices Generated')
			->line('The invoice generation process has completed successfully.')
			->line('Properties Processed: ' . $this->result['properties'])
			->line('Units Processed: ' . $this->result['units'])
			->line('Invoices Generated: ' . $this->result['invoices'])
			->line($this->result['message'])
			->action('View Invoices', url('/admin/invoices'));
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
			//
		];
	}
}
