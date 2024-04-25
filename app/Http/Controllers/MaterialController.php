<?php

namespace App\Http\Controllers;

use App\Http\Services\MaterialService;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function __construct(protected MaterialService $service)
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
            "title" => "required|string",
            "description" => "nullable|string|max:65535",
            "week" => "required|integer",
            "startsAt" => "required|date",
            "endsAt" => "required|date",
            "type" => "nullable|string",
            "richText" => "nullable|string",
            "media" => "nullable|string",
            "unitId" => "required|string",
        ]);

        [$saved, $message, $material] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $material,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Material  $material
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
     * @param  \App\Models\Material  $material
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "title" => "nullable|string",
            "description" => "nullable|string|max:65535",
            "week" => "nullable|integer",
            "startsAt" => "nullable|date",
            "endsAt" => "nullable|date",
            "type" => "nullable|string",
            "richText" => "nullable|string",
            "media" => "nullable|string",
            "unitId" => "nullable|string",
        ]);

        [$saved, $message, $material] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $material,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Material  $material
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $material] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $material,
        ], 200);
    }

    /*
     * Get Materials By Unit
     */
    public function byUnitId($id)
    {
        return $this->service->byUnitId($id);
    }
}
