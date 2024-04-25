<?php

namespace App\Http\Controllers;

use App\Http\Services\AcademicSessionService;
use App\Models\AcademicSession;
use Illuminate\Http\Request;

class AcademicSessionController extends Controller
{
    public function __construct(protected AcademicSessionService $service)
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
            "courseId" => "required|integer",
            "year" => "required|integer",
            "semester" => "required|integer",
            "startsAt" => "required|date",
            "endsAt" => "required|date",
        ]);

        [$saved, $message, $academicSession] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $academicSession,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AcademicSession  $academicSession
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
     * @param  \App\Models\AcademicSession  $academicSession
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "courseId" => "nullable|integer",
            "year" => "nullable|integer",
            "semester" => "nullable|integer",
            "startsAt" => "nullable|date",
            "endsAt" => "nullable|date",
        ]);

        [$saved, $message, $academicSession] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $academicSession,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AcademicSession  $academicSession
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $instructor] = $this->service->destory($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $instructor,
        ], 200);
    }

    /*
     * By Course Id
     */
    public function byCourseId(Request $request, $id)
    {
        return $this->service->byCourseId($id);
    }
}
