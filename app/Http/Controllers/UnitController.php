<?php

namespace App\Http\Controllers;

use App\Http\Services\UnitService;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
	public function __construct(protected UnitService $service)
	{
		// 
	}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
			"propertyId" => "required|string",
			"name" => "required|string",
			"rent" => "required|string",
			"deposit" => "required|string",
			"type" => "required|string",
			"bedrooms" => "nullable|string",
			"size" => "nullable|array"
		]);

		[$saved, $message, $unit] = $this->service->store($request);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $unit
		], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
			"name" => "nullable|string",
			"rent" => "nullable|string",
			"deposit" => "nullable|string",
			"type" => "nullable|string",
			"bedrooms" => "nullable|string",
			"size" => "nullable|array"
		]);

		[$saved, $message, $unit] = $this->service->update($request, $id);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $unit
		], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $unit] = $this->service->destroy($id);

		return response([
			"status" => $deleted,
			"message" => $message,
			"data" => $unit
		], 200);
    }

	/*
	* Get Units by Property ID
	*/ 
	public function byPropertyId(Request $request, $id)
	{
		return $this->service->byPropertyId($request, $id);
	}

	/*
	* Statements
	*/ 
	public function statements(Request $request, $unitId)
	{
		return $this->service->statements($request, $unitId);
	}
}

