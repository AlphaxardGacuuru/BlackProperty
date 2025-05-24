<?php

namespace App\Http\Services;

use App\Http\Resources\StatementResource;
use App\Http\Resources\UnitResource;
use App\Http\Services\Service;
use App\Models\CreditNote;
use App\Models\Deduction;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Property;
use App\Models\Unit;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class UnitService extends Service
{
	/*
     * Get All Units
     */
	public function index($request)
	{
		$unitQuery = new Unit;

		$unitQuery = $this->search($unitQuery, $request);

		$units = $unitQuery
			->orderBy("id", "DESC")
			->paginate(20)
			->appends([
				"propertyId" => $request->propertyId,
			]);

		return UnitResource::collection($units);
	}

	/*
     * Get One Unit
     */
	public function show($id)
	{
		$unit = Unit::findOrFail($id);

		return new UnitResource($unit);
	}

	/*
     * Store Unit
     */
	public function store($request)
	{
		$unit = new Unit;
		$unit->property_id = $request->input("propertyId");
		$unit->name = $request->input("name");
		$unit->rent = $request->input("rent");
		$unit->deposit = $request->input("deposit");
		$unit->type = $request->input("type");
		$unit->bedrooms = $request->input("bedrooms");
		$unit->size = $request->input("size");
		$unit->ensuite = $request->input("ensuite");
		$unit->dsq = $request->input("dsq");

		$saved = DB::transaction(function () use ($unit, $request) {
			$saved = $unit->save();

			Property::find($request->propertyId)
				->increment("unit_count");

			return $saved;
		});

		$message = $unit->name . " Created Successfully";

		return [$saved, $message, $unit];
	}

	/*
     * Update Unit
     */
	public function update($request, $id)
	{
		$unit = Unit::findOrFail($id);

		if ($request->filled("name")) {
			$unit->name = $request->input("name");
		}

		if ($request->filled("rent")) {
			$unit->rent = $request->input("rent");
		}

		if ($request->filled("deposit")) {
			$unit->deposit = $request->input("deposit");
		}

		if ($request->filled("type")) {
			$unit->type = $request->input("type");
		}

		if ($request->filled("bedrooms")) {
			$unit->bedrooms = $request->input("bedrooms");
			$unit->size = null;
		}

		if ($request->filled("size")) {
			$unit->size = $request->input("size");
			$unit->bedrooms = null;
		}

		if ($request->filled("ensuite")) {
			$unit->ensuite = $request->input("ensuite");
		}

		if ($request->filled("dsq")) {
			$unit->dsq = $request->input("dsq");
		}

		$saved = $unit->save();

		$message = $unit->name . " Updated Successfully";

		return [$saved, $message, $unit];
	}

	/*
     * Destroy
     */
	public function destroy($id)
	{
		$unit = Unit::findOrFail($id);

		$deleted = DB::transaction(function () use ($unit) {
			Property::find($unit->property_id)
				->decrement("unit_count");

			return $unit->delete();
		});

		$message = $unit->name . " Deleted Successfully";

		return [$deleted, $message, $unit];
	}

	/*
     * Statements
     */
	public function statements($request, $unitId)
	{
		$invoiceQuery = Invoice::whereHas("userUnit", function ($query) use ($unitId) {
			$query->where("unit_id", $unitId);
		})->select("*", "amount as invoiceDebit");

		$totalInvoices = $invoiceQuery->sum("amount");

		$invoices = $invoiceQuery
			->orderBy("month", "ASC")
			->orderBy("year", "ASC")
			->get();

		$paymentQuery = Payment::whereHas("userUnit", function ($query) use ($unitId) {
			$query->where("unit_id", $unitId);
		})->select("*", "amount as paymentCredit");

		$totalPayments = $paymentQuery->sum("amount");

		$payments = $paymentQuery
			->orderBy("month", "ASC")
			->orderBy("year", "ASC")
			->get();

		$creditNoteQuery = CreditNote::whereHas("userUnit", function ($query) use ($unitId) {
			$query->where("unit_id", $unitId);
		})->select("*", "amount as creditNoteCredit");

		$totalCreditNotes = $creditNoteQuery->sum("amount");

		$creditNotes = $creditNoteQuery
			->orderBy("month", "ASC")
			->orderBy("year", "ASC")
			->get();

		$deductionQuery = Deduction::whereHas("userUnit", function ($query) use ($unitId) {
			$query->where("unit_id", $unitId);
		})->select("*", "amount as deductionDebit");

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
		return StatementResource::collection($paginator)
			->additional([
				"due" => number_format($totalInvoices - $totalCreditNotes + $totalDeductions),
				"paid" => number_format($totalPayments),
				"balance" => number_format($totalInvoices - $totalCreditNotes - $totalPayments + $totalDeductions),
			]);
	}

	/*
     * Search
     */
	public function search($query, $request)
	{
		$propertyId = explode(",", $request->propertyId,);

		$query = $query->whereIn("property_id", $propertyId);

		if ($request->filled("name")) {
			$query = $query->where("name", "LIKE", "%" . $request->input("name") . "%");
		}

		if ($request->filled("type")) {
			$query = $query->where("type", $request->type);
		}

		if ($request->filled("status")) {
			$query = $query->where("status", $request->status);
		}

		return $query;
	}
}
