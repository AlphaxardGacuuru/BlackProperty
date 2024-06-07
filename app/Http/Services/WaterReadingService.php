<?php

namespace App\Http\Services;

use App\Http\Resources\WaterReadingResource;
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
            $readingDoesntExist = WaterReading::where("user_unit_id", $reading["userUnitId"])
                ->where("month", $request->month)
                ->where("year", $request->year)
                ->doesntExist();

            if ($readingDoesntExist) {
                $waterReading = new WaterReading;
                $waterReading->user_unit_id = $reading["userUnitId"];
                $waterReading->reading = $reading["reading"];
                $waterReading->month = $request->month;
                $waterReading->year = $request->year;
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

        $waterReadings = $waterReadingsQuery
            ->orderBy("month", "DESC")
            ->orderBy("year", "DESC")
            ->paginate(20);

        return WaterReadingResource::collection($waterReadings);
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
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
