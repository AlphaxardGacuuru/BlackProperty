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
use App\Notifications\InvoicesGeneratedNotification;
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
		$result = [
			"status" => true,
			"message" => "Invoice processing completed successfully.",
			"invoices" => 0,
			"units" => 0,
			"properties" => 0,
		];

		try {
			$properties = Property::where("invoice_date", now()->day)
				// Check that user of property has active subscription
				->whereHas("user", function ($query) {
					$query->whereHas("userSubscriptionPlans", function ($query) {
						$query->where("status", "active")
							->where("end_date", ">", now());
					});
				})
				->get();

			$result["properties"] = $properties->count();

			$properties->each(function ($property) use (&$result) {
				$units = $property
					->units()
					// Ensure Unit has a tenant
					->whereHas("userUnits", function ($query) {
						$query->whereNull("vacated_at");
					})
					// Check that the unit doesn't have an invoice for the current month
					->whereDoesntHave("userUnits.invoices", function ($query) {
						$query->where("month", now()->month)
							->where("year", now()->year);
					})
					->get();

				$result["units"] += $units->count();

				$units->each(function ($unit) use (&$result) {
					// Loop through each invoice type
					collect(["rent", "service_charge"])
						->each(function ($type) use ($unit, &$result) {
							// Skip if Property doesn't have a service charge
							if ($type === "service_charge" && $unit->property->service_charge < 1) {
								return;
							}

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

								if ($saved) {
									$result["invoices"]++;
								}

								[$saved, $message, $invoice] = (new InvoiceService)->sendEmail($invoice->id);
								[$saved, $message, $invoice] = (new InvoiceService)->sendSMS($invoice->id);
							} catch (Exception $e) {
								Log::error("Invoice {$type} Error, Unit {$unit->id}: " . $e->getMessage());
								$result["status"] = false;
								$result["message"] = "Invoice processing encountered errors.";
							}
						});
				});
			});

			$superAdmin = User::where("email", "al@black.co.ke")->first();

			if (!$superAdmin) {
				throw new Exception("Super Admin user not found.");
			}

			$superAdmin->notify(new InvoicesGeneratedNotification($result));
		} catch (Exception $e) {
			Log::error("Job Error: " . $e->getMessage());
			$result["status"] = false;
			$result["message"] = "An error occurred during invoice processing.";
		}

		return $result;
	}
}
