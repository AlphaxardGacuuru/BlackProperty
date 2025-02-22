<?php

namespace App\Http\Controllers;

use App\Http\Services\PropertyService;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function __construct(protected PropertyService $service)
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
            "name" => "required|string",
            "location" => "required|string",
            "depositFormula" => "required|string",
            "serviceCharge" => "required|string",
            "invoiceDate" => "required|string",
            "email" => "required|string",
            "sms" => "required|string",
        ]);

        [$saved, $message, $property] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $property,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Property  $property
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
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "location" => "nullable|string",
            "depositFormula" => "nullable|string",
            "serviceCharge" => "nullable|string",
            "waterBillRate" => "nullable|string",
            "invoiceDate" => "nullable|string",
            "email" => "nullable|string",
            "sms" => "nullable|string",
        ]);

        [$saved, $message, $property] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $property,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $property] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $property,
        ], 200);
    }

    /*
     * Dashboard
     */
    public function dashboard(Request $request)
    {
        return $this->service->dashboard($request);
    }
}
