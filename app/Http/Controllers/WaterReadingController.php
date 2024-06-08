<?php

namespace App\Http\Controllers;

use App\Http\Services\WaterReadingService;
use App\Models\WaterReading;
use Illuminate\Http\Request;

class WaterReadingController extends Controller
{
    public function __construct(protected WaterReadingService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->service->index($request);
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
            "waterReadings" => "required|array",
            "month" => "required|integer",
            "year" => "required|integer",
        ]);

        [$saved, $message, $waterReadings] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $waterReadings,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\WaterReading  $waterReading
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
     * @param  \App\Models\WaterReading  $waterReading
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "reading" => "nullable|string",
            "month" => "nullable|string",
            "year" => "nullable|integer",
        ]);

        [$saved, $message, $waterReading] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $waterReading,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WaterReading  $waterReading
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $waterReading] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $waterReading,
        ], 200);
    }

    /*
     * Get Water Readings by Property ID
     */
    public function byPropertyId(Request $request, $id)
    {
        return $this->service->byPropertyId($request, $id);
    }
}
