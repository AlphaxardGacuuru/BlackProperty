<?php

namespace App\Mail;

use App\Http\Resources\InvoiceResource;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $invoice;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($invoice)
    {
        $this->invoice = $this->invoiceResource($invoice);
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        $formattedType = collect(explode('_', $this->invoice->type))
            ->map(fn($word) => ucfirst($word)) // Capitalize each word
            ->join(' '); // Join the words with a space

        return new Envelope(
            subject: $formattedType . ' Invoice',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            markdown: 'emails.invoice',
            with: [
                'invoice' => $this->invoice,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [
			// Attachment::fromStorage('/storage/img/vector/default-monochrome.svg')
                // ->as('logo.svg')
                // ->withMime('application/svg'),
		];
    }

    public function invoiceResource($invoice)
    {
        $code = str_pad($invoice->id, 6, '0', STR_PAD_LEFT);
        $code = "I-" . $code;

        $waterReading = $invoice->userUnit
            ->waterReadings()
            ->where("month", $invoice->month)
            ->where("year", $invoice->year)
            ->first()
            ->reading;
			
        $waterUsage = $invoice->userUnit
            ->waterReadings()
            ->where("month", $invoice->month)
            ->where("year", $invoice->year)
            ->first()
            ->usage;

        // $invoice->id = $invoice->id;
        $invoice->code = $code;
        $invoice->userUnitId = $invoice->user_unit_id;
        $invoice->tenantId = $invoice->userUnit->user_id;
        $invoice->tenantName = $invoice->userUnit->user->name;
        $invoice->tenantPhone = $invoice->userUnit->user->phone;
        $invoice->tenantEmail = $invoice->userUnit->user->email;
        $invoice->unitId = $invoice->userUnit->unit_id;
        $invoice->unitName = $invoice->userUnit->unit->name;
        // $invoice->type = $invoice->type;
        $invoice->waterReading = $waterReading;
        $invoice->waterUsage = $waterUsage;
        $invoice->amount = number_format($invoice->amount);
        $invoice->paid = number_format($invoice->paid);
        $invoice->balance = number_format($invoice->balance);
        // $invoice->status = $invoice->status;
        // $invoice->month = $invoice->month;
        // $invoice->year = $invoice->year;
        $invoice->emailsSent = $invoice->emails_sent;
        $invoice->updatedAt = $invoice->updated_at;
        $invoice->createdAt = $invoice->created_at;

		return $invoice;
    }
}
