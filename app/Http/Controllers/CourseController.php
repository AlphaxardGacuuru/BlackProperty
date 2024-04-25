<?php

namespace App\Http\Controllers;

use App\Http\Services\CourseService;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function __construct(protected CourseService $service)
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
            "name" => "required|string|unique:courses",
            "description" => "required|string|max:65535",
            "duration" => "required|string",
            "price" => "required|string",
            "departmentId" => "nullable|string",
        ]);

        [$saved, $message, $course] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $course,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
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
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string|unique:courses",
            "description" => "nullable|string|max:65535",
            "duration" => "nullable|string",
            "price" => "nullable|string",
            "departmentId" => "nullable|string",
        ]);

        [$saved, $message, $course] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $course,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $course] = $this->service->destory($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $course,
        ], 200);
    }

    /*
     * By User ID
     */
    public function byUserId($id)
    {
        return $this->service->byUserId($id);
    }
}
