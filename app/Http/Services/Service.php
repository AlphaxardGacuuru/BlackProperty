<?php

namespace App\Http\Services;

class Service
{
	public $id;

	public function __construct()
	{
		// Current User ID
		$auth = auth('sanctum')->user();

		$this->id = $auth ? $auth->id : 0;
	}

	public function generateStatement($invoices, $payments, $creditNotes, $deductions)
	{
		$balance = 0;

		$statements = $invoices
			->concat($payments)
			->concat($creditNotes)
			->concat($deductions)
			->groupBy(function ($item) {
				// Ensure month and year are always two/four digits
				$month = str_pad($item->month, 2, '0', STR_PAD_LEFT);
				$year = strlen($item->year) === 2 ? '20' . $item->year : $item->year;
				return "{$year}-{$month}";
			})
			->flatten()
			->map(function ($item) use (&$balance) {
				if ($item->invoiceDebit) {
					$balance += $item->invoiceDebit;

					$invoice = $item;

					// Update Invoice Status
					if ($balance < $invoice->amount) {
						$invoice->paid = $invoice->amount - $balance;
						$invoice->balance = $balance;
						$invoice->status = "partially_paid";
					} else if ($balance >= $invoice->amount) {
						$invoice->paid = $invoice->amount;
						$invoice->balance = 0;
						$invoice->status = "paid";
					}

					$invoice->save();

					$item->type = "Invoice";
					$item->debit = $item->invoiceDebit;
				} else if ($item->paymentCredit) {
					$item->type = "Payment";
					$item->credit = $item->paymentCredit;
					$balance -= $item->paymentCredit;
				} else if ($item->creditNoteCredit) {
					$item->type = "Credit Note";
					$item->credit = $item->creditNoteCredit;
					$balance -= $item->creditNoteCredit;
				} else {
					$item->type = "Deduction";
					$item->debit = $item->deductionDebit;
					$balance += $item->deductionDebit;
				}

				$item->balance = $balance;

				return $item;
			})
			->reverse()
			->values();

		return $statements;
	}
}
