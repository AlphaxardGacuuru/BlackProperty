<?php

namespace App\Http\Services;

use App\Models\CreditNote;
use App\Models\Deduction;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;

class Service
{
	public $id;

	public function __construct()
	{
		// Current User ID
		$auth = auth('sanctum')->user();

		$this->id = $auth ? $auth->id : 0;
	}

	public function updateInvoiceStatus($userUnitId)
	{
		$invoiceQuery = Invoice::where("user_unit_id", $userUnitId);

		$invoices = $invoiceQuery
			->orderBy("month", "ASC")
			->orderBy("year", "ASC")
			->get();

		$paymentQuery = Payment::where("user_unit_id", $userUnitId);

		$totalPayments = $paymentQuery->sum("amount");

		$creditNoteQuery = CreditNote::where("user_unit_id", $userUnitId);

		$totalCreditNotes = $creditNoteQuery->sum("amount");

		$deductionQuery = Deduction::where("user_unit_id", $userUnitId);

		$totalDeductions = $deductionQuery->sum("amount");

		$paid = $totalPayments + $totalCreditNotes - $totalDeductions;

		$invoices->each(function ($invoice) use (&$paid) {
			if ($paid <= 0) {
				$invoice->paid = 0;
				$invoice->balance = $invoice->amount;
				$invoice->status = "not_paid";
			} else if ($paid < $invoice->amount) {
				$invoice->paid = $invoice->amount - $paid;
				$invoice->balance = $paid;
				$invoice->status = "partially_paid";
			} else if ($paid >= $invoice->amount) {
				$invoice->paid = $invoice->amount;
				$invoice->balance = 0;
				$invoice->status = "paid";
			}

			$invoice->save();
			
			$paid -= $invoice->paid;
		});
	}
}
