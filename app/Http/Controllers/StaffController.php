<?php

namespace App\Http\Controllers;

use App\Http\Services\StaffService;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    public function __construct(protected StaffService $service)
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
            "email" => "required|email",
            "phone" => "string",
            "gender" => "required|string",
            "propertyId" => "required|string",
        ]);

        [$saved, $message, $staff, $code] = $this->service->store($request);

        $title = $saved ? "message" : "errors";
        $message = $saved ? $message : [$message];

        return response([
            "status" => $saved,
            $title => $message,
            "data" => $staff,
        ], $code);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Staff  $staff
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
     * @param  \App\Models\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "email" => "nullable|email|unique:users",
            "phone" => "string|unique:users",
            "gender" => "nullable|string",
            "propertyId" => "nullable|string",
        ]);

        [$saved, $message, $staff] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $staff,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        [$deleted, $message, $staff] = $this->service->destroy($request, $id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $staff,
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
