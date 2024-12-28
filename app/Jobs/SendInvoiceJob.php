<?php

namespace App\Jobs;

use App\Mail\InvoiceMail;
use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendInvoiceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $invoice;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = $this->invoice
            ->userUnit
            ->user
            ->email;

        try {
            Mail::to($email)->send(new InvoiceMail($this->invoice));

            // Increment the emails_sent column
            $this->invoice->increment("emails_sent");
        } catch (\Symfony\Component\Mailer\Exception\HttpTransportException $exception) {

            throw $exception;
        }
    }

    /**
     * Handle a job failure.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function failed($exception)
    {
        Log::error('Send Invoice Job Failed: ' . $exception);

        Log::emergency('Send Invoice Job Failed: ' . $exception);
        Log::alert('Send Invoice Job Failed: ' . $exception);
        Log::critical('Send Invoice Job Failed: ' . $exception);
        Log::error('Send Invoice Job Failed: ' . $exception);
        Log::warning('Send Invoice Job Failed: ' . $exception);
        Log::notice('Send Invoice Job Failed: ' . $exception);
        Log::info('Send Invoice Job Failed: ' . $exception);
        Log::debug('Send Invoice Job Failed: ' . $exception);

        if ($this->invoice->emails_sent > 0) {
            Invoice::find($this->invoice->id)->decrement('emails_sent');
        }
    }
}
