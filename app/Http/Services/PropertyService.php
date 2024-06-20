<?php

namespace App\Http\Services;

use App\Http\Resources\PropertyResource;
use App\Http\Services\Service;
use App\Models\Property;

class PropertyService extends Service
{
    /*
     * Get All Properties
     */
    public function index()
    {
        $properties = Property::orderBy("id", "DESC")->get();

        return PropertyResource::collection($properties);
    }

    /*
     * Get One Property
     */
    public function show($id)
    {
        $property = Property::findOrFail($id);

        return new PropertyResource($property);
    }

    /*
     * Store Property
     */
    public function store($request)
    {
        $property = new Property;
        $property->user_id = $this->id;
        $property->name = $request->input("name");
        $property->location = $request->input("location");
        $property->deposit_formula = $request->input("depositFormula");
        $property->service_charge = $request->input("serviceCharge");
        $property->water_bill_rate = $request->input("waterBillRate");

        $saved = $property->save();

        $message = $property->name . " created successfully";

        return [$saved, $message, $property];
    }

    /*
     * Update Property
     */
    public function update($request, $id)
    {
        $property = Property::findOrFail($id);

        if ($request->filled("name")) {
            $property->name = $request->input("name");
        }

        if ($request->filled("location")) {
            $property->location = $request->input("location");
        }

        if ($request->filled("depositFormula")) {
            $property->deposit_formula = $request->input("depositFormula");
        }

        if ($request->filled("serviceCharge")) {
            $property->service_charge = $request->input("serviceCharge");
        }

        $saved = $property->save();

        $message = $property->name . " updated successfully";

        return [$saved, $message, $property];
    }

    /*
     * Destroy
     */
    public function destroy($id)
    {
        $property = Property::findOrFail($id);

        $deleted = $property->delete();

        $message = $property->name . " deleted successfully";

        return [$deleted, $message, $property];
    }

    /*
     * By User ID
     */
    public function byUserId($request, $id)
    {
        if ($request->filled("idAndName")) {
            $properties = Property::select("id", "name", "service_charge as serviceCharge")
                ->where("user_id", $id)
                ->orderBy("id", "DESC")
                ->get();

            return response([
                "data" => $properties,
            ], 200);
        }

        $properties = Property::where("user_id", $id)
            ->orderBy("id", "DESC")
            ->get();

        return PropertyResource::collection($properties);
    }
}
