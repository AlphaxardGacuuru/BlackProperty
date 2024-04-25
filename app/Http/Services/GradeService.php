<?php

namespace App\Http\Services;

use App\Models\Grade;

class GradeService extends Service
{
    /*
     * Store Grade
     */
    public function store($request)
    {
        // Check if User has graded
        $gradeQuery = Grade::where("user_id", $this->id)
            ->where("submission_id", $request->submissionId);

        if ($gradeQuery->doesntExist()) {
            $grade = new Grade;
            $grade->user_id = $this->id;

            $message = "Grade saved";
        } else {
            $grade = $gradeQuery->first();

            $message = "Grade updated";
        }

        $grade->submission_id = $request->input("submissionId");
        $grade->grade = $request->input("grade");
        $grade->comments = $request->input("comments");
        $saved = $grade->save();

        return [$saved, $message, $grade];
    }
}
