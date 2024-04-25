<?php

namespace App\Http\Controllers;

use App\Http\Services\StudentService;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function __construct(protected StudentService $service)
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
            "email" => "required|email|unique:users",
            "phone" => "string|unique:users",
            "gender" => "required|string",
			"currentLocation" => "nullable|string",
			"originLocation" => "nullable|string",
            "facultyId" => "required|string",
            "departmentId" => "required|string",
        ]);

        [$saved, $message, $student] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $student,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
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
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "email" => "nullable|email|unique:users",
            "phone" => "string|unique:users",
            "gender" => "nullable|string",
			"currentLocation" => "nullable|string",
			"originLocation" => "nullable|string",
            "facultyId" => "nullable|string",
            "departmentId" => "nullable|string",
            "courseId" => "nullable|integer",
            "unitId" => "nullable|integer",
            "sessionId" => "nullable|integer",
        ]);

        [$saved, $message, $student] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $student,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $student] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $student,
        ], 200);
    }
}
