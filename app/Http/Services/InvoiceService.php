<?php

namespace App\Http\Services;

use App\Http\Resources\InvoiceResource;
use App\Mail\InvoiceMail;
use App\Models\CreditNote;
use App\Models\Deduction;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\UserUnit;
use App\Models\WaterReading;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use App\Http\Services\EmailService;
use App\Http\Services\SMSSendService;
use App\Models\User;
use App\Notifications\InvoiceReminderNotification;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Mailer\Exception\HttpTransportException;

class InvoiceService extends Service
{
	/*
     * Fetch All Invoices
     */
	public function index($request)
	{
		$invoiceQuery = new Invoice;

		$invoiceQuery = $this->search($invoiceQuery, $request);

		$invoices = $invoiceQuery
			->orderBy("month", "DESC")
			->orderBy("year", "DESC")
			->orderBy("id", "DESC")
			->paginate(20)
			->appends($request->all());

		$sum = $invoiceQuery->sum("amount");
		$balance = $invoiceQuery->sum("balance");
		$paid = $invoiceQuery->sum("paid");

		return InvoiceResource::collection($invoices)
			->additional([
				"sum" => number_format($sum),
				"balance" => number_format($balance),
				"paid" => number_format($paid),
			]);
	}

	/*
     * Fetch Invoice
     */
	public function show($id)
	{
		$invoice = Invoice::find($id);

		return new InvoiceResource($invoice);
	}

	/*
     * Save Invoice
     */
	public function store($request)
	{
		$saved = 0;

		foreach ($request->userUnitIds as $userUnitId) {
			// Check if invoice exists for User, Unit and Month
			$invoiceDoesntExist = Invoice::where("user_unit_id", $userUnitId)
				->where("type", $request->type)
				->where("month", $request->month)
				->where("year", $request->year)
				->doesntExist();

			$amount = $this->getAmount($request, $userUnitId);

			if ($invoiceDoesntExist) {
				$invoice = new Invoice;
				$invoice->user_unit_id = $userUnitId;
				$invoice->type = $request->type;
				$invoice->amount = $amount;
				$invoice->balance = $amount;
				$invoice->month = $request->month;
				$invoice->year = $request->year;
				$invoice->created_by = $this->id == 0 ? $request->createdBy : $this->id;

				$saved = DB::transaction(function () use ($invoice) {
					$saved = $invoice->save();

					// Update Invoice Status
					$this->updateInvoiceStatus($invoice->user_unit_id);

					return $saved;
				});
			}
		}

		if ($saved) {
			$message = count($request->userUnitIds) > 1 ?
				"Invoices Created Successfully" :
				"Invoice Created Successfully";
		} else {
			$message = count($request->userUnitIds) > 1 ?
				"Invoices Already Exist" :
				"Invoice Already Exists";
		}

		return [$saved, $message, $invoice];
	}

	/*
     * Destroy Invoice
     */
	public function destroy($id)
	{
		$ids = explode(",", $id);

		$deleted = Invoice::whereIn("id", $ids)->delete();

		$message = count($ids) > 1 ?
			"Invoices Deleted Successfully" :
			"Invoice Deleted Successfully";

		return [$deleted, $message, ""];
	}

	/*
     * Handle Search
     */
	public function search($query, $request)
	{
		if ($request->propertyId != "undefined") {
			$propertyIds = explode(",", $request->propertyId);

			$isSuper = in_array("All", $propertyIds);

			if (!$isSuper) {
				$query = $query->whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
					$query->whereIn("id", $propertyIds);
				});
			}
		}

		$number = $request->input("number");

		if ($request->filled("number")) {
			$query = $query->where("number", "LIKE", "%" . $number . "%");
		}

		if ($request->filled("unitId") && $request->unitId != "undefined") {
			$unitId = $request->input("unitId");

			$query = $query->whereHas("userUnit.unit", function ($query) use ($unitId) {
				$query->where("id", $unitId);
			});
		}

		$unit = $request->input("unit");

		if ($request->filled("unit")) {
			$query = $query->whereHas("userUnit.unit", function ($query) use ($unit) {
				$query->where("name", "LIKE", "%" . $unit . "%");
			});
		}

		$tenant = $request->input("tenant");

		if ($request->filled("tenant")) {
			$query = $query->whereHas("userUnit.user", function ($query) use ($tenant) {
				$query->where("name", "LIKE", "%" . $tenant . "%");
			});
		}

		if ($request->filled("tenantId") && $request->tenantId != "undefined") {
			$tenantId = $request->input("tenantId");

			$query = $query->whereHas("userUnit", function ($query) use ($tenantId) {
				$query->where("user_id", $tenantId);
			});
		}

		if ($request->filled("userUserId")) {
			$userUserId = $request->input("userUserId");

			$query = $query->where("user_unit_id", $userUserId);
		}

		$type = $request->input("type");

		if ($request->filled("type")) {
			$query = $query->where("type", $type);
		}

		$status = $request->input("status");

		if ($request->filled("status")) {
			$query = $query->where("status", $status);
		}

		$startMonth = $request->input("startMonth");
		$endMonth = $request->input("endMonth");
		$startYear = $request->input("startYear");
		$endYear = $request->input("endYear");

		if ($request->filled("startMonth")) {
			$query = $query->where("month", ">=", $startMonth);
		}

		if ($request->filled("endMonth")) {
			$query = $query->where("month", "<=", $endMonth);
		}

		if ($request->filled("startYear")) {
			$query = $query->where("year", ">=", $startYear);
		}

		if ($request->filled("endYear")) {
			$query = $query->where("year", "<=", $endYear);
		}

		return $query;
	}

	/*
     * Get Amount
     */
	public function getAmount($request, $userUnitId)
	{
		$userUnit = UserUnit::find($userUnitId);

		// Get amount depending on the type of invoice
		switch ($request->type) {
			case "rent":
				return $userUnit->unit->rent;
				break;

			case "deposit":
				return $userUnit->unit->deposit;
				break;

			case "service":
				return $userUnit->unit->property->service_charge?->service;
				break;

			case "electricity":
				return $userUnit->unit->property->service_charge?->electricity;
				break;

			case "garbage":
				return $userUnit->unit->property->service_charge?->garbage;
				break;

			case "security":
				return $userUnit->unit->property->service_charge?->security;
				break;

			case "internet":
				return $userUnit->unit->property->service_charge?->internet;
				break;

			case "cleaning":
				return $userUnit->unit->property->service_charge?->cleaning;
				break;

			case "parking":
				return $userUnit->unit->property->service_charge?->parking;
				break;

			default:
				return $this->getWaterBill($request, $userUnitId);
				break;
		}
	}

	/*
     * Get Water Bill
     */
	public function getWaterBill($request, $userUnitId)
	{
		// Get Water Bill
		$waterReadingQuery = WaterReading::where("user_unit_id", $userUnitId)
			->where("month", $request->month)
			->where("year", $request->year);

		if ($waterReadingQuery->doesntExist()) {
			return throw ValidationException::withMessages([
				"Water Reading" => ["Water Reading Doesn't Exist"],
			]);
		} else {
			return $waterReadingQuery->sum("bill");
		}
	}

	/*
     * Handle Invoice Adjustment
     */
	public function adjustInvoice($invoiceId)
	{
		$paid = Payment::where("invoice_id", $invoiceId)->sum("amount");

		$creditNotes = CreditNote::where("invoice_id", $invoiceId)->sum("amount");

		$deductions = Deduction::where("invoice_id", $invoiceId)->sum("amount");

		$paid = $paid + $creditNotes - $deductions;

		$invoice = Invoice::find($invoiceId);

		$balance = $invoice->amount - $paid;

		// Check if paid is enough
		if ($paid == 0) {
			$status = "not_paid";
		} else if ($paid < $invoice->amount) {
			$status = "partially_paid";
		} else if ($paid == $invoice->amount) {
			$status = "paid";
		} else {
			$status = "over_paid";
		}

		$invoice->paid = $paid;
		$invoice->balance = $balance;
		$invoice->status = $status;

		return $invoice->save();
	}

	/*
     * Send Invoice by Email
     */
	public function sendEmail($invoiceId)
	{
		$invoice = Invoice::findOrFail($invoiceId);

		try {
			DB::beginTransaction();

			Mail::to($invoice->userUnit->user->email)->send(new InvoiceMail($invoice));
			// Mail::to("al@black.co.ke")->send(new InvoiceMail($invoice));

			$invoice->increment("emails_sent");

			// Save Email
			$emailService = new EmailService;

			$request = new Request([
				"userUnitId" => $invoice->userUnit->id,
				"invoiceId" => $invoice->id,
				"email" => $invoice->userUnit->user->email,
				"model" => $invoice,
			]);

			$emailService->store($request);

			DB::commit();
		} catch (HttpTransportException $exception) {
			DB::rollBack();

			Log::error("Invoice Email Error: " . $exception->getMessage());

			throw $exception;
		}

		return ["Success", "Invoice Email Sent Successfully", $invoice];
	}

	/*
     * Send Invoice by SMS
     */
	public function sendSMS($invoiceId)
	{
		$invoice = Invoice::findOrFail($invoiceId);

		$smsService = new SMSSendService($invoice);

		try {
			$status = $smsService->sendSMS("invoice");

			$invoice->increment("smses_sent");
		} catch (\Throwable $th) {
			throw $th;
		}

		return [$status, "Invoice SMS Sent Successfully", $invoice];
	}

	/*
     * Send Invoice Reminder
     */
	public function sendReminder($invoice)
	{
		try {
			$invoice->userUnit->user->notify(new InvoiceReminderNotification($invoice));

			// User::where("email", "al@black.co.ke")
			// ->first()
			// ->notify(new InvoiceReminderNotification($invoice));

			$invoice->increment("reminders_sent");
		} catch (HttpTransportException $exception) {
			throw $exception;
		}

		return ["Success", "Invoice Reminder Sent Successfully", $invoice];
	}
}
