<?php

namespace App\Http\Services;

use App\Http\Resources\AcademicSessionResource;
use App\Models\AcademicSession;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AcademicSessionService extends Service
{
    /*
     * Get Academic Sessions
     */
    public function index()
    {
        $academicSessions = AcademicSession::orderBy("id", "DESC")->paginate(20);

        return AcademicSessionResource::collection($academicSessions);
    }

    /*
     * Show
     */
    public function show($id)
    {
        $academicSession = AcademicSession::find($id);

        return new AcademicSessionResource($academicSession);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $academicSession = new AcademicSession;
        $academicSession->course_id = $request->courseId;
        $academicSession->year = $request->year;
        $academicSession->semester = $request->semester;
        $academicSession->starts_at = $request->startsAt;
        $academicSession->ends_at = $request->endsAt;

        $saved = $academicSession->save();

        $message = "Session saved successfully";

        return [$saved, $message, $academicSession];
    }

    /*
     * Update
     */
    public function update($request, $id)
    {
        $academicSession = AcademicSession::find($id);

        if ($request->filled("courseId")) {
            $academicSession->course_id = $request->courseId;
        }

        if ($request->filled("year")) {
            $academicSession->year = $request->year;
        }

        if ($request->filled("semester")) {
            $academicSession->semester = $request->semester;
        }

        if ($request->filled("startsAt")) {
            $academicSession->starts_at = $request->startsAt;
        }

        if ($request->filled("endsAt")) {
            $academicSession->ends_at = $request->endsAt;
        }

        $saved = $academicSession->save();

        $message = "Session updated successfully";

        return [$saved, $message, $academicSession];
    }

    /*
     * Destory Resource
     */
    public function destory($id)
    {
        $academicSession = AcademicSession::find($id);

        $deleted = $academicSession->delete();

        $message = "Session deleted";

        return [$deleted, $message, $academicSession];
    }

    /*
     * By Course Id
     */
    public function byCourseId($id)
    {
        $academicSession = AcademicSession::where("course_id", $id)
            ->where("starts_at", "<=", now())
            ->where("ends_at", ">=", now())
            ->orderBy("id", "DESC")
            ->first();

        // Check if exists
        if (!$academicSession) {
			return response([
				"errors" => ["Course doesn't have an ongoing Session"]
			], 422);
        }

        return new AcademicSessionResource($academicSession);
    }
}
