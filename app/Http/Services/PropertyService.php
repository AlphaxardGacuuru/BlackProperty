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
	public function index($request)
	{
		if ($request->filled("idAndName")) {
			$propertyQuery = Property::select("id", "name");

			$propertyQuery = $this->search($propertyQuery, $request);

			$properties = $propertyQuery
				->orderBy("id", "DESC")
				->get();

			return response([
				"data" => $properties,
			], 200);
		}

		$propertyQuery = new Property;

		$propertyQuery = $this->search($propertyQuery, $request);

		$properties = $propertyQuery
			->orderBy("id", "DESC")
			->paginate();

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
		$property->invoice_date = $request->input("invoiceDate");
		$property->email = $request->input("email");
		$property->sms = $request->input("sms");

		$saved = $property->save();

		$message = $property->name . " Created Successfully";

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

		if ($request->filled("waterBillRate")) {
			$property->water_bill_rate = $request->input("waterBillRate");
		}

		if ($request->filled("invoiceDate")) {
			$property->invoice_date = $request->input("invoiceDate");
		}

		if ($request->filled("email")) {
			$property->email = $request->input("email");
		}

		if ($request->filled("sms")) {
			$property->sms = $request->input("sms");
		}

		$saved = $property->save();

		$message = $property->name . " Updated Successfully";

		return [$saved, $message, $property];
	}

	/*
     * Destroy
     */
	public function destroy($id)
	{
		$property = Property::findOrFail($id);

		$deleted = $property->delete();

		$message = $property->name . " Deleted Successfully";

		return [$deleted, $message, $property];
	}

	/*
     * Search
     */
	public function search($query, $request)
	{
		$propertyId = explode(",", $request->propertyId);

		if ($request->filled("propertyId")) {
			$query = $query->whereIn("id", $propertyId);
		}

		if ($request->filled("userId")) {
			$query = $query->where("user_id", $request->userId);
		}

		if ($request->filled("name")) {
			$query = $query->where("name", "LIKE", "%" . $request->name . "%");
		}

		return $query;
	}
}
