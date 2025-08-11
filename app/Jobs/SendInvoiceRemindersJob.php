<?php

namespace App\Jobs;

use App\Http\Services\InvoiceService;
use App\Models\Invoice;
use Carbon\Carbon;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendInvoiceRemindersJob implements ShouldQueue
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
		$result = [
			"status" => true,
			"message" => "Invoice reminders sent successfully.",
			"invoices" => 0,
		];

		Invoice::where("status", "!=", "paid")
			// Check that user of property has active subscription
			->whereHas("userUnit.unit.property.user", function ($query) {
				$query->whereHas("userSubscriptionPlans", function ($query) {
					$query->where("status", "active")
						->where("end_date", ">", now());
				});
			})
			->get()
			->each(function ($invoice) use (&$result) {
				$invoiceDate = $invoice->userUnit->unit->property->invoice_date;

				// Check that the property's invoice date has passed by 10 days
				if (Carbon::parse($invoiceDate)->addDays(10)->isFuture()) {
					return;
				}

				[$saved, $message, $data] = (new InvoiceService)->sendReminder($invoice);

				if ($saved) {
					$result["invoices"]++;
				}
			});

		return $result;
	}
}
