<?php

namespace App\Notifications;

use App\Mail\WelcomeMail;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeNotification extends Notification
{
	use Queueable;

	/**
	 * Create a new notification instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// 
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
		return (new WelcomeMail($notifiable))
			->from("al@black.co.ke", "Alphaxard from Black Property")
			->to($notifiable->email)
			->subject('Welcome to Black Property!')
			->greeting('Hello ' . $notifiable->name . ',')
			->line("Thank you for joining Black Property. We are excited to have you on board!")
			->action('View', url('/admin/dashboard'));
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
			'url' => '/',
			'from' => 'Admin',
			'message' => 'Welcome ' . $this->user->name . ' to Black Property.',
		];
	}
}
