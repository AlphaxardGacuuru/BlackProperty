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
			"name" => "required|string",
			"location" => "required|string"
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
			"name" => "required|string",
			"location" => "required|string"
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
	public function byPropertyId($id)
	{
		return $this->service->byPropertyId($id);
	}
}

