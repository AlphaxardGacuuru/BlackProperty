<?php

namespace App\Http\Controllers;

use App\Http\Services\ResourceService;
use App\Models\Resource;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
	public function __construct(protected ResourceService $service)
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
			"link" => "required|string",
		]);

		[$saved, $message, $resource] = $this->service->store($request);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $resource
		], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Resource  $resource
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
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
			"name" => "nullable|string",
			"link" => "nullable|string",
		]);

		[$saved, $message, $resource] = $this->service->update($request, $id);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $resource
		], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $resource] = $this->service->destory($id); 

		return response([
			"status" => $deleted,
			"message" => $message,
			"data" => $resource
		], 200);
    }
}
