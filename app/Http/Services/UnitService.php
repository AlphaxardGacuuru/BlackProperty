<?php

namespace App\Http\Services;

use App\Http\Resources\UnitResource;
use App\Http\Services\Service;
use App\Models\Unit;

class UnitService extends Service
{
    /*
     * Get All Units
     */
    public function index()
    {
        $units = Unit::orderBy("id", "DESC")->paginate(20);

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

        $saved = $unit->save();

        $message = $unit->name . " created successfully";

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

        $saved = $unit->save();

        $message = $unit->name . " updated successfully";

        return [$saved, $message, $unit];
    }

    /*
     * Destroy
     */
    public function destroy($id)
    {
        $unit = Unit::findOrFail($id);

        $deleted = $unit->delete();

        $message = $unit->name . " deleted successfully";

        return [$deleted, $message, $unit];
    }

    /*
     * Get Units by Property ID
     */
    public function byPropertyId($id)
    {
        $units = Unit::where("property_id", $id)
            ->orderBy("id", "DESC")
            ->paginate(20);

        return UnitResource::collection($units);
    }
}
