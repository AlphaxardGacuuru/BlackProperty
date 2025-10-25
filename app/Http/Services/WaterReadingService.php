<?php

namespace App\Http\Services;

use App\Http\Resources\WaterReadingResource;
use App\Models\Unit;
use App\Models\UserUnit;
use App\Models\WaterReading;

class WaterReadingService extends Service
{
	/*
     * Get All Water Readings
     */
	public function index($request)
	{
		$waterReadingsQuery = new WaterReading;

		$waterReadingsQuery = $this->search($waterReadingsQuery, $request);

		$waterReadings = $waterReadingsQuery
			->orderBy("month", "DESC")
			->orderBy("year", "DESC")
			->paginate(20)
			->appends([
				"propertyId" => $request->propertyId,
				"unitId" => $request->unitId,
			]);

		$totalUsage = $waterReadingsQuery->sum("usage") * 1000;
		$totalBill = $waterReadingsQuery->sum("bill");

		return WaterReadingResource::collection($waterReadings)
			->additional([
				"totalUsage" => number_format($totalUsage),
				"totalBill" => number_format($totalBill),
				"unitId" => $request->unitId,
			]);
	}

	/*
     * Get One Water Reading
     */
	public function show($id)
	{
		$waterReading = WaterReading::findOrFail($id);

		return new WaterReadingResource($waterReading);
	}

	/*
     * Store Water Reading
     */
	public function store($request)
	{
		$saved = 0;

		foreach ($request->waterReadings as $reading) {
			// Check if water reading exists for UserUnit, Month and Year
			$readingQuery = WaterReading::where("user_unit_id", $reading["userUnitId"])
				->where("type", $request->type)
				->where("month", $request->month)
				->where("year", $request->year);

			$lastMonth = $request->month - 1;

			// Get Last Water Reading
			$previousReadingQuery = WaterReading::where("user_unit_id", $reading["userUnitId"])
				->where("month", $lastMonth)
				->where("year", $request->year)
				->first();

			$previouReading = $previousReadingQuery ? $previousReadingQuery->reading : 0;

			$usage = $reading["reading"] - $previouReading;

			$waterBillRate = UserUnit::find($reading["userUnitId"])
				->unit
				->property
				->water_bill_rate;

			$bill = $usage * $waterBillRate[$request->type];

			if ($readingQuery->doesntExist()) {
				$waterReading = new WaterReading;
				$waterReading->user_unit_id = $reading["userUnitId"];
				$waterReading->type = $request->type;
				$waterReading->reading = $reading["reading"];
				$waterReading->month = $request->month;
				$waterReading->year = $request->year;
				$waterReading->usage = $usage;
				$waterReading->bill = $bill;

				$saved = $waterReading->save();
			}
		}

		if ($saved) {
			$message = count($request->waterReadings) > 1 ?
				"Water Readings Saved Successfully" :
				"Water Reading Saved Successfully";
		} else {
			$message = count($request->waterReadings) > 1 ?
				"Water Readings Already Exist" :
				"Water Reading Already Exists";
		}

		return [$saved, $message, ""];
	}

	/*
     * Update Water Reading
     */
	public function update($request, $id)
	{
		$waterReading = WaterReading::find($id);

		if ($request->filled("type")) {
			// $waterReading->type = $request->type;
		}

		if ($request->filled("reading")) {
			$waterReading->reading = $request->reading;
		}

		if ($request->filled("month")) {
			// $waterReading->month = $request->month;
		}

		if ($request->filled("year")) {
			// $waterReading->year = $request->year;
		}

		$saved = $waterReading->save();

		return [$saved, "Water Reading Updated Successfully", $waterReading];
	}

	/*
     * Destroy Invoice
     */
	public function destroy($id)
	{
		$ids = explode(",", $id);

		$deleted = WaterReading::whereIn("id", $ids)->delete();

		$message = count($ids) > 1 ?
			"WaterReadings Deleted Successfully" :
			"WaterReading Deleted Successfully";

		return [$deleted, $message, ""];
	}

	/*
     * Handle Search
     */
	public function search($query, $request)
	{
		$propertyIds = explode(",", $request->propertyId);

		$isSuper = in_array("All", $propertyIds);

		if (!$isSuper) {
			$query = $query->whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
				$query->whereIn("id", $propertyIds);
			});
		}

		$tenant = $request->input("tenant");

		if ($request->filled("tenant")) {
			$query = $query
				->whereHas("userUnit.user", function ($query) use ($tenant) {
					$query->where("name", "LIKE", "%" . $tenant . "%");
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

		$type = $request->input("type");

		if ($request->filled("type")) {
			$query = $query->where("name", $type);
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
}
