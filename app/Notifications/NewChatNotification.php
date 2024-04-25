<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewChatNotification extends Notification
{
    use Queueable;

    public $chat;
    public $user;
    public $recipient;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($chat, $user, $recipient)
    {
        $this->chat = $chat;
        $this->user = $user;
        $this->recipient = $recipient;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
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
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
		// Check User type and set appropriate url
        switch ($this->recipient->account_type) {
            case "staff":
                $location = "/admin";
                break;

            case "staff":
                $location = "/instructor";
                break;

            default:
                $location = "/student";
                break;
        }

        return [
            'url' => $location . '/chats/view/' . $this->user->id,
            'from' => $this->user->id,
            'message' => $this->user->name . ' sent you a message: ' . $this->chat->text,
        ];
    }
}
