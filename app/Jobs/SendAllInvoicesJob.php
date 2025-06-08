<?php

namespace App\Jobs;

use App\Http\Services\InvoiceService;
use App\Models\Invoice;
use App\Models\Property;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendAllInvoicesJob implements ShouldQueue
{
	use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	/**
	 * Create a new job instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{
		Property::where("invoice_date", now()->day)
			->get()
			->each(function ($property) {
				$property
					->units()
					->each(function ($unit) {
						$unit
							->currentUserUnit()
							?->invoices()
							->each(function ($invoice) {
								$invoiceService = new InvoiceService;
								// Send invoice email and SMS
								// $invoiceService->sendEmail($invoice->id);
								// $invoiceService->sendSMS($invoice->id);
							});
						Log::info("Unit: " . $unit);
					});

				Log::info("Property: " . $property);
			});
	}
}
