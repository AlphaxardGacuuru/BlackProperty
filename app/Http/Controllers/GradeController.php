<?php

namespace App\Http\Controllers;

use App\Http\Services\GradeService;
use App\Models\Grade;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    public function __construct(protected GradeService $service)
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
            "submissionId" => "required|integer",
            "grade" => "required|integer|min:0|max:100",
            "comments" => "nullable|string|max:65535",
        ]);

        [$saved, $message, $grade] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $grade,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function show(Grade $grade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function destroy(Grade $grade)
    {
        //
    }
}
