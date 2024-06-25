<?php

namespace App\Http\Services;

use App\Http\Resources\WaterReadingResource;
use App\Models\UserUnit;
use App\Models\WaterReading;

class WaterReadingService extends Service
{
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

            $bill = $usage * $waterBillRate;

            if ($readingQuery->doesntExist()) {
                $waterReading = new WaterReading;
                $waterReading->user_unit_id = $reading["userUnitId"];
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
            "Water Readings saved successfully" :
            "Water Reading saved successfully";
        } else {
            $message = count($request->waterReadings) > 1 ?
            "Water Readings already exist" :
            "Water Reading already exists";
        }

        return [$saved, $message, ""];
    }

    /*
     * Update Water Reading
     */
    public function update($request, $id)
    {
        $waterReading = WaterReading::find($id);

        // Check if water reading exists for UserUnit, Month and Year
        $readingExists = WaterReading::where("user_unit_id", $waterReading->user_unit_id)
            ->where("month", $request->month)
            ->where("year", $request->year)
            ->exists();

        if ($readingExists) {
            return [0, "Water Reading already exists", $waterReading];
        }

        if ($request->filled("reading")) {
            $waterReading->reading = $request->reading;
        }

        if ($request->filled("month")) {
            $waterReading->month = $request->month;
        }

        if ($request->filled("year")) {
            $waterReading->year = $request->year;
        }

        $saved = $waterReading->save();

        return [$saved, "Water Reading updated successfully", $waterReading];
    }

    /*
     * Destroy Invoice
     */
    public function destroy($id)
    {
        $ids = explode(",", $id);

        $deleted = WaterReading::whereIn("id", $ids)->delete();

        $message = count($ids) > 1 ?
        "WaterReadings deleted successfully" :
        "WaterReading deleted successfully";

        return [$deleted, $message, ""];
    }

    /*
     * Get Invoices by Property ID
     */
    public function byPropertyId($request, $id)
    {
        $ids = explode(",", $id);

        $waterReadingsQuery = WaterReading::whereHas("userUnit.unit.property", function ($query) use ($ids) {
            $query->whereIn("id", $ids);
        });

        $waterReadingsQuery = $this->search($waterReadingsQuery, $request);

        $totalUsage = $waterReadingsQuery->sum("usage") * 1000;
        $totalBill = $waterReadingsQuery->sum("bill");

        $waterReadings = $waterReadingsQuery
            ->orderBy("month", "DESC")
            ->orderBy("year", "DESC")
            ->paginate(20);

        return WaterReadingResource::collection($waterReadings)
            ->additional([
                "totalUsage" => number_format($totalUsage),
                "totalBill" => number_format($totalBill),
            ]);
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
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
