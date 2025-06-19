<?php

namespace App\Jobs;

use App\Http\Services\InvoiceService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Log;

class GenerateInvoicesJob implements ShouldQueue
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
			->where("service_charge", ">", 0)
			->get()
			->each(function ($property) {
				$property
					->units()
					// Ensure Unit has a tenent
					->whereHas("userUnits", function ($query) {
						$query->whereNull("vacated_at");
					})
					// Check that the unit doesn't have an invoice for the current month
					->whereDoesntHave("userUnits.invoices", function ($query) {
						$query->where("month", now()->month)
							->where("year", now()->year);
					})
					->get()
					->each(function ($unit) {
						// Loop through each invoice type
						collect(["rent", "service_charge"])->each(function ($type) use ($unit) {
							// Make Request
							$request = new Request([
								"userUnitIds" => [$unit->currentUserUnit()?->id],
								"type" => $type,
								"month" => now()->month,
								"year" => now()->year,
								"createdBy" => User::where("email", "al@black.co.ke")->first()?->id,
							]);

							try {
								[$saved, $message, $invoice] = (new InvoiceService)->store($request);
							} catch (Exception $e) {
								Log::error("Invoice {$type} Error, Unit {$unit->id}: " . $e->getMessage());
								return;
							}
						});
					});
			});
	}
}
