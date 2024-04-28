<?php

namespace App\Http\Controllers;

use App\Http\Services\TenantService;
use App\Models\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function __construct(protected TenantService $service)
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
        //
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
            "email" => "required|string",
            "phone" => "required|string",
            "gender" => "required|string",
        ]);

        [$saved, $message, $tenant, $code] = $this->service->store($request);

        $title = $saved == "error" ? "errors" : "message";
        $message = $saved == "error" ? [$message] : $message;

        return response([
            "status" => $saved,
            $title => $message,
            "data" => $tenant,
        ], $code);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function show(Tenant $tenant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tenant $tenant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tenant $tenant)
    {
        //
    }

    /*
     * Get Units by Unit ID
     */
    public function byUnitId($id)
    {
        return $this->service->byUnitId($id);
    }
}
