<?php

namespace App\Http\Services;

use App\Http\Resources\StudentResource;
use App\Http\Services\Service;
use App\Models\User;
use App\Models\UserCourse;
use App\Models\UserDepartment;
use App\Models\UserFaculty;
use App\Models\UserUnit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentService extends Service
{
    /*
     * Get All Students
     */
    public function index()
    {
        $students = User::where("account_type", "student")
            ->orderBy("id", "DESC")
            ->paginate(20);

        return StudentResource::collection($students);
    }

    /*
     * Get One Student
     */
    public function show($id)
    {
        $student = User::findOrFail($id);

        return new StudentResource($student);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $student = new User;
        $student->name = $request->input("name");
        $student->email = $request->input("email");
        $student->phone = $request->input("phone");
        $student->gender = $request->input("gender");
        $student->current_location = $request->input("currentLocation");
        $student->origin_location = $request->input("originLocation");
        $student->password = Hash::make($request->input("email"));
        $student->account_type = "student";

        $saved = DB::transaction(function () use ($student, $request) {
            $saved = $student->save();

            // Add UserFaculty
            $userFaculty = new UserFaculty;
            $userFaculty->user_id = $student->id;
            $userFaculty->faculty_id = $request->input("facultyId");
            $userFaculty->save();

            // Add UserDepartment
            $userDepartment = new UserDepartment;
            $userDepartment->user_id = $student->id;
            $userDepartment->department_id = $request->input("departmentId");
            $userDepartment->save();

            return $saved;
        });

        $message = $student->name . " created successfully";

        return [$saved, $message, $student];
    }

    /*
     * Update Student
     */
    public function update($request, $id)
    {
        $student = User::findOrFail($id);

        if ($request->filled("name")) {
            $student->name = $request->input("name");
        }

        if ($request->filled("email")) {
            $student->email = $request->input("email");
        }

        if ($request->filled("phone")) {
            $student->phone = $request->input("phone");
        }

        if ($request->filled("gender")) {
            $student->gender = $request->input("gender");
        }

        if ($request->filled("currentLocation")) {
            $student->current_location = $request->input("currentLocation");
        }

        if ($request->filled("originLocation")) {
            $student->origin_location = $request->input("originLocation");
        }

        if ($request->filled("password")) {
            $student->password = Hash::make($request->input("email"));
        }

        if ($request->filled("facultyId")) {
            // Delete UserFaculty
            UserFaculty::where("user_id", $id)->delete();

            // Add UserFaculty
            $userFaculty = new UserFaculty;
            $userFaculty->user_id = $student->id;
            $userFaculty->faculty_id = $request->input("facultyId");
            $userFaculty->save();
        }

        if ($request->filled("departmentId")) {
            // Delete UserDepartment
            UserDepartment::where("user_id", $id)->delete();

            // Add UserDepartment
            $userDepartment = new UserDepartment;
            $userDepartment->user_id = $student->id;
            $userDepartment->department_id = $request->input("departmentId");
            $userDepartment->save();
        }

        if ($request->filled("courseId")) {
            // Check if User Course Exists
            $userCourseDoesntExist = UserCourse::where("user_id", $id)
                ->where("course_id", $request->courseId)
                ->doesntExist();

            if ($userCourseDoesntExist) {
                $userCourse = new UserCourse;
                $userCourse->user_id = $student->id;
                $userCourse->course_id = $request->input("courseId");
                $userCourse->save();
            }
        }

        if ($request->filled("unitId")) {
            $userUnit = new UserUnit;
            $userUnit->user_id = $student->id;
            $userUnit->unit_id = $request->input("unitId");
            $userUnit->academic_session_id = $request->input("sessionId");
            $userUnit->save();
        }

        $saved = $student->save();

        $message = $student->name . " updated successfully";

        return [$saved, $message, $student];
    }

    /*
     * Soft Delete Service
     */
    public function destroy($id)
    {
        $student = User::findOrFail($id);

        $deleted = $student->delete();

        return [$deleted, $student->name . " deleted", $student];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $student = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($student->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $student->delete();

        return [$deleted, $student->name . " deleted"];
    }
}
