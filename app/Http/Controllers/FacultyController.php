<?php

namespace App\Http\Controllers;

use App\Http\Services\FacultyService;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
	public function __construct(protected FacultyService $service)
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
			"name" => "required|string|unique:faculties"
		]);

		[$saved, $message, $faculty] = $this->service->store($request);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $faculty
		], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Faculty  $faculty
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
     * @param  \App\Models\Faculty  $faculty
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
			"name" => "nullable|string|unique:faculties"
		]);

		[$saved, $message, $faculty] = $this->service->update($request, $id);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $faculty
		], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Faculty  $faculty
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $faculty] = $this->service->destroy($id);

		return response([
			"status" => $deleted,
			"message" => $message,
			"data" => $faculty
		], 200);
    }
}
