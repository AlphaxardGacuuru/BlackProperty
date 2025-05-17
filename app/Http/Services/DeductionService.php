<?php

namespace App\Http\Services;

use App\Http\Resources\DeductionResource;
use App\Models\Deduction;
use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DeductionService extends Service
{
	/*
     * Fetch All Deductions
     */
	public function index($request)
	{
		$deductionsQuery = new Deduction;

		$deductionsQuery = $this->search($deductionsQuery, $request);

		$sum = $deductionsQuery->sum("amount");

		$deductions = $deductionsQuery
			->orderBy("month", "DESC")
			->orderBy("year", "DESC")
			->orderBy("id", "DESC")
			->paginate(20);

		return DeductionResource::collection($deductions)
			->additional(["sum" => $sum]);
	}

	/*
     * Fetch Deduction
     */
	public function show($id)
	{
		$deduction = Deduction::find($id);

		return new DeductionResource($deduction);
	}

	/*
     * Save Deduction
     */
	public function store($request)
	{
		$userUnitId = Unit::find($request->unitId)
			->currentUserUnit()
			->id;

		$deduction = new Deduction();
		$deduction->user_unit_id = $userUnitId;
		$deduction->description = $request->description;
		$deduction->amount = $request->amount;
		$deduction->month = $request->month;
		$deduction->year = $request->year;
		$deduction->created_by = $this->id;

		$saved = DB::transaction(function () use ($deduction) {
			$saved = $deduction->save();

			// $this->invoiceService()->adjustInvoice($deduction->invoice_id);

			return $saved;
		});

		return [$saved, "Deduction created successfully", $deduction];
	}

	/*
     * Update Deduction
     */
	public function update($request, $id)
	{
		$deduction = Deduction::find($id);

		if ($request->filled("amount")) {
			$deduction->amount = $request->amount;
		}

		if ($request->filled("description")) {
			$deduction->description = $request->description;
		}

		if ($request->filled("month")) {
			$deduction->month = $request->month;
		}

		if ($request->filled("year")) {
			$deduction->year = $request->year;
		}

		$saved = DB::transaction(function () use ($deduction) {
			$saved = $deduction->save();

			// $this->invoiceService()->adjustInvoice($deduction->invoice_id);

			return $saved;
		});

		return [$saved, "Deduction updated", $deduction];
	}

	/*
     * Destroy Deduction
     */
	public function destroy($id)
	{
		$deduction = Deduction::findOrFail($id);

		$deleted = DB::transaction(function () use ($deduction) {
			$deleted = $deduction->delete();

			// $this->invoiceService()->adjustInvoice($deduction->invoice_id);

			return $deleted;
		});

		return [$deleted, "Deduction deleted successfully", $deduction];
	}

	/*
     * Handle Search
     */
	public function search($query, $request)
	{
		$propertyId = explode(",", $request->propertyId);

		if ($request->filled("propertyId")) {
			$query = $query->whereHas("userUnit.unit.property", function ($query) use ($propertyId) {
				$query->whereIn("id", $propertyId);
			});
		}

		$unitId = $request->input("unitId");

		if ($request->filled("unitId")) {
			$query = $query
				->whereHas("userUnit.unit", function ($query) use ($unitId) {
					$query->where("id", $unitId);
				});
		}

		$unit = $request->input("unit");

		if ($request->filled("unit")) {
			$query = $query
				->whereHas("userUnit.unit", function ($query) use ($unit) {
					$query->where("name", "LIKE", "%" . $unit . "%");
				});
		}

		$unit = $request->input("unit");

		if ($request->filled("unit")) {
			$query = $query
				->whereHas("userUnit.unit", function ($query) use ($unit) {
					$query->where("name", "LIKE", "%" . $unit . "%");
				});
		}

		$tenant = $request->input("tenant");

		if ($request->filled("tenant")) {
			$query = $query
				->whereHas("userUnit.user", function ($query) use ($tenant) {
					$query->where("name", "LIKE", "%" . $tenant . "%");
				});
		}

		$type = $request->input("type");

		if ($request->filled("type")) {
			$query = $query->where("type", $type);
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

	public function invoiceService()
	{
		return new InvoiceService;
	}
}
