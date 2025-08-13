<?php

namespace App\Http\Services;

use App\Http\Resources\SubscriptionStatementResource;
use App\Http\Resources\UnitStatementResource;
use App\Http\Services\Service;
use App\Models\CreditNote;
use App\Models\Deduction;
use App\Models\Invoice;
use App\Models\MPESATransaction;
use App\Models\Payment;
use App\Models\Unit;
use App\Models\UserSubscriptionPlan;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;

class StatementService extends Service
{
	/*
	* Handle Statement Type
	*/
	public function show($request, $type)
	{
		if ($type === "unit") {
			return $this->unit($request);
		} else if ($type === "subscription") {
			return $this->subscription($request);
		}

		return response()->json([
			"message" => "Invalid statement type.",
		], 400);
	}

	/*
     * Fetch Unit Statements
     */
	public function unit($request)
	{
		$invoiceQuery = new Invoice;
		$invoiceQuery = $this->search($invoiceQuery, $request);
		$invoiceQuery = $invoiceQuery->select("*", "amount as invoiceDebit");

		$totalInvoices = $invoiceQuery->sum("amount");

		$invoices = $invoiceQuery
			->orderBy("month", "ASC")
			->orderBy("year", "ASC")
			->get();

		$paymentQuery = new Payment;
		$paymentQuery = $this->search($paymentQuery, $request);
		$paymentQuery = $paymentQuery->select("*", "amount as paymentCredit");

		$totalPayments = $paymentQuery->sum("amount");

		$payments = $paymentQuery
			->orderBy("month", "ASC")
			->orderBy("year", "ASC")
			->get();

		$creditNoteQuery = new CreditNote;
		$creditNoteQuery = $this->search($creditNoteQuery, $request);
		$creditNoteQuery = $creditNoteQuery->select("*", "amount as creditNoteCredit");

		$totalCreditNotes = $creditNoteQuery->sum("amount");

		$creditNotes = $creditNoteQuery
			->orderBy("month", "ASC")
			->orderBy("year", "ASC")
			->get();

		$deductionQuery = new Deduction;
		$deductionQuery = $deductionQuery->select("*", "amount as deductionDebit");
		$deductionQuery = $this->search($deductionQuery, $request);

		$totalDeductions = $deductionQuery->sum("amount");

		$deductions = $deductionQuery
			->orderBy("month", "ASC")
			->orderBy("year", "ASC")
			->get();

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
			->sortKeys()
			->flatten()
			->map(function ($item) use (&$balance) {
				if ($item->invoiceDebit) {
					$item->type = "Invoice";
					$item->debit = $item->invoiceDebit;
					$balance += $item->invoiceDebit;
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

		// Get current page from the request, default is 1
		$currentPage = $request->input("page", 1);

		// Define how many items we want to be visible in each page
		$perPage = 20;

		// Slice the collection to get the items to display in current page
		$currentItems = $statements
			->slice(($currentPage - 1) * $perPage, $perPage)
			->values();

		// Create paginator
		$paginator = new LengthAwarePaginator(
			$currentItems,
			$statements->count(),
			$perPage,
			$currentPage,
			[
				'path' => $request->url(),
				'query' => $request->query(),
			]
		);

		// return $pagedRentStatements;
		return UnitStatementResource::collection($paginator)
			->additional([
				"due" => number_format($totalInvoices),
				"paid" => number_format($totalPayments),
				"balance" => number_format($totalInvoices - $totalCreditNotes - $totalPayments + $totalDeductions),
			]);
	}

	/*
     * Fetch Subscription Statements
     */
	public function subscription($request)
	{
		$userSubscriptionQuery = new UserSubscriptionPlan;
		$userSubscriptionQuery = $this->search($userSubscriptionQuery, $request);
		$userSubscriptionQuery = $userSubscriptionQuery->select("*", "amount_paid as debit");

		$totalInvoices = $userSubscriptionQuery->sum("amount_paid");

		$invoices = $userSubscriptionQuery
			->orderBy("id", "DESC")
			->get();

		$mpesaTransactionQuery = new MPESATransaction;
		$mpesaTransactionQuery = $this->search($mpesaTransactionQuery, $request);
		$mpesaTransactionQuery = $mpesaTransactionQuery->select("*", "amount as mpesaCredit");

		$totalPayments = $mpesaTransactionQuery->sum("amount");

		$mpesaPayments = $mpesaTransactionQuery
			->orderBy("id", "DESC")
			->get();

		$balance = 0;

		$statements = $invoices
			->concat($mpesaPayments)
			->groupBy(fn($item) => $item->created_at)
			->sortKeys()
			->flatten()
			->map(function ($item) use (&$balance) {
				if ($item->debit) {
					$item->type = "Subscription";
					$item->debit = $item->debit;
					$balance += $item->debit;
				} else if ($item->mpesaCredit) {
					$item->type = "Mpesa Payment";
					$item->credit = $item->mpesaCredit;
					$balance -= $item->mpesaCredit;
				}

				$item->balance = $balance;

				return $item;
			})
			->reverse()
			->values();

		// Get current page from the request, default is 1
		$currentPage = $request->input("page", 1);

		// Define how many items we want to be visible in each page
		$perPage = 20;

		// Slice the collection to get the items to display in current page
		$currentItems = $statements
			->slice(($currentPage - 1) * $perPage, $perPage)
			->values();

		// Create paginator
		$paginator = new LengthAwarePaginator(
			$currentItems,
			$statements->count(),
			$perPage,
			$currentPage,
			[
				'path' => $request->url(),
				'query' => $request->query(),
			]
		);

		return SubscriptionStatementResource::collection($paginator)
			->additional([
				"due" => number_format($totalInvoices),
				"paid" => number_format($totalPayments),
				"balance" => number_format($totalInvoices - $totalPayments),
			]);
	}

	/*
     * Search
     */
	public function search($query, $request)
	{
		if ($request->filled("userUnitId") && $request->userUnitId != "undefined") {
			$query = $query->where("user_unit_id", $request->userUnitId);
		}

		if ($request->filled("unitId")) {
			$unitId = $request->input("unitId");

			$query = $query->whereHas("userUnit", function ($query) use ($unitId) {
				$query->where("unit_id", $unitId);
			});
		}

		if ($request->filled("tenantId")) {
			$tenantId = $request->input("tenantId");

			$query = $query->whereHas("userUnit", function ($query) use ($tenantId) {
				$query->where("user_id", $tenantId);
			});
		}

		if ($request->filled("subscriptionUserId")) {
			$query = $query->where("user_id", $request->subscriptionUserId);
		}

		return $query;
	}
}
