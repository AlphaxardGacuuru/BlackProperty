<?php

namespace App\Http\Services;

use App\Http\Resources\SubmissionResource;
use App\Models\Submission;

class SubmissionService extends Service
{
    /*
     * Get Submissions
     */
    public function index($request)
    {
        $submissions = Submission::where("academic_session_id", $request->input("sessionId"))
            ->where("unit_id", $request->input("unitId"))
            ->where("week", $request->input("week"))
            ->where("type", $request->input("type"))
            ->get();

        return SubmissionResource::collection($submissions);
    }
}
