<?php

namespace App\Http\Controllers;

use App\Http\Services\InstructorService;
use App\Models\Instructor;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    public function __construct(protected InstructorService $service)
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
            "email" => "required|email|unique:users",
            "phone" => "string|unique:users",
            "gender" => "required|string",
            "originLocation" => "required|string",
            "currentLocation" => "required|string",
            "education" => "required|string",
            "facultyId" => "nullable|string",
            "departmentId" => "nullable|string",
            "courseId" => "nullable|string",
            "unitId" => "nullable|string",
        ]);

        [$saved, $message, $instructor] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $instructor,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Instructor  $instructor
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
     * @param  \App\Models\Instructor  $instructor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "email" => "nullable|email|unique:users",
            "phone" => "string|unique:users",
            "gender" => "nullable|string",
            "originLocation" => "nullable|string",
            "currentLocation" => "nullable|string",
            "education" => "nullable|string",
            "facultyId" => "nullable|string",
            "departmentId" => "nullable|string",
            "courseId" => "nullable|string",
            "unitId" => "nullable|string",
        ]);

        [$saved, $message, $instructor] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $instructor,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Instructor  $instructor
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $instructor] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $instructor,
        ], 200);
    }
}
