<?php

namespace App\Http\Services;

use App\Http\Resources\InstructorResource;
use App\Http\Services\Service;
use App\Models\User;
use App\Models\UserCourse;
use App\Models\UserDepartment;
use App\Models\UserFaculty;
use App\Models\UserUnit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InstructorService extends Service
{
    /*
     * Get All Instructors
     */
    public function index($request)
    {
        $courseId = $request->input("courseId");

        if ($request->filled("idAndName")) {
            $instructors = User::with("courses")
                ->where("account_type", "instructor")
                ->whereHas("courses", function ($query) use ($courseId) {
                    $query->where("course_id", $courseId);
                })
                ->orderBy("id", "DESC")
                ->get();

            return response([
                "data" => $instructors,
            ], 200);
        }

        $instructors = User::where("account_type", "instructor")
            ->orderBy("id", "DESC")
            ->paginate(20);

        return InstructorResource::collection($instructors);
    }

    /*
     * Get One Instructor
     */
    public function show($id)
    {
        $instructor = User::findOrFail($id);

        return new InstructorResource($instructor);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $instructor = new User;
        $instructor->name = $request->input("name");
        $instructor->email = $request->input("email");
        $instructor->phone = $request->input("phone");
        $instructor->gender = $request->input("gender");
        $instructor->current_location = $request->input("currentLocation");
        $instructor->origin_location = $request->input("originLocation");
        $instructor->education = $request->input("education");
        $instructor->password = Hash::make($request->input("email"));
        $instructor->account_type = "instructor";

        $saved = DB::transaction(function () use ($instructor, $request) {
            $saved = $instructor->save();

            // Add UserFaculty
            if ($request->filled("facultyId")) {
                $userFaculty = new UserFaculty;
                $userFaculty->user_id = $instructor->id;
                $userFaculty->faculty_id = $request->input("facultyId");
                $userFaculty->save();
            }

            // Add UserDepartment
            if ($request->filled("departmentId")) {
                $userDepartment = new UserDepartment;
                $userDepartment->user_id = $instructor->id;
                $userDepartment->department_id = $request->input("departmentId");
                $userDepartment->save();
            }

            // Add UserCourse
            if ($request->filled("courseIds")) {
                foreach ($request->courseIds as $courseId) {
                    $userUnit = new UserCourse;
                    $userUnit->user_id = $instructor->id;
                    $userUnit->course_id = $courseId;
                    $userUnit->save();
                }
            }

            // Add UserUnit
            if ($request->filled("unitId")) {
                $userUnit = new UserUnit;
                $userUnit->user_id = $instructor->id;
                $userUnit->unit_id = $request->input("unitId");
                $userUnit->save();
            }

            return $saved;
        });

        $message = $instructor->name . " created successfully";

        return [$saved, $message, $instructor];
    }

    /*
     * Update Instructor
     */
    public function update($request, $id)
    {
        $instructor = User::findOrFail($id);

        if ($request->filled("name")) {
            $instructor->name = $request->input("name");
        }

        if ($request->filled("email")) {
            $instructor->email = $request->input("email");
        }

        if ($request->filled("phone")) {
            $instructor->phone = $request->input("phone");
        }

        if ($request->filled("gender")) {
            $instructor->gender = $request->input("gender");
        }

        if ($request->filled("originLocation")) {
            $instructor->origin_location = $request->input("originLocation");
        }

        if ($request->filled("currentLocation")) {
            $instructor->current_location = $request->input("currentLocation");
        }

        if ($request->filled("education")) {
            $instructor->education = $request->input("education");
        }

        if ($request->filled("password")) {
            $instructor->password = Hash::make($request->input("email"));
        }

        if ($request->filled("facultyId")) {
            // If user has opted to remove
            if ($request->input("facultyId") == "remove") {
                UserFaculty::where("user_id", $id)->delete();
            }

            // Delete UserFaculty
            $doesntExist = UserFaculty::where("user_id", $id)
                ->where("faculty_id", $request->input("facultyId"))
                ->doesntExist();

            // Add UserFaculty
            if ($doesntExist) {
                $userFaculty = new UserFaculty;
                $userFaculty->user_id = $instructor->id;
                $userFaculty->faculty_id = $request->input("facultyId");
                $userFaculty->save();
            }
        }

        if ($request->filled("departmentId")) {
            // If user has opted to remove
            if ($request->input("departmentId") == "remove") {
                UserDepartment::where("user_id", $id)->delete();
            }

            // Delete UserDepartment
            $doesntExist = UserDepartment::where("user_id", $id)
                ->where("department_id", $request->input("departmentId"))
                ->doesntExist();

            // Add UserDepartment
            if ($doesntExist) {
                $userDepartment = new UserDepartment;
                $userDepartment->user_id = $instructor->id;
                $userDepartment->department_id = $request->input("departmentId");
                $userDepartment->save();
            }
        }

        // Add UserCourse
        if (count($request->courseIds) > 0) {
            foreach ($request->courseIds as $courseId) {
                // Check if course already exists
                $userCourseDoesntExist = UserCourse::where("course_id", $courseId)
                    ->where("user_id", $id)
                    ->doesntExist();

                if ($userCourseDoesntExist) {
                    $userCourse = new UserCourse;
                    $userCourse->user_id = $id;
                    $userCourse->course_id = $courseId;
                    $userCourse->save();
                } else {
                    // Remove courses not included
                    UserCourse::where("user_id", $id)
                        ->whereNotIn("course_id", $request->courseIds)
                        ->delete();
                }
            }
        } else {
            // Remove courses not included
            UserCourse::where("user_id", $id)
                ->delete();
        }

        // Update Unit
        if ($request->filled("unitId")) {
            // If user has opted to remove
            if ($request->input("unitId") == "remove") {
                UserUnit::where("user_id", $id)->delete();
            }

            // Delete UserUnit
            $doesntExist = UserUnit::where("user_id", $id)
                ->where("unit_id", $request->input("unitId"))
                ->doesntExist();

            // Add UserUnit
            if ($doesntExist) {
                $userUnit = new UserUnit;
                $userUnit->user_id = $instructor->id;
                $userUnit->unit_id = $request->input("unitId");
                $userUnit->save();
            }
        }

        $saved = $instructor->save();

        $message = $instructor->name . " updated successfully";

        return [$saved, $message, $instructor];
    }

    /*
     * Soft Delete Service
     */
    public function destroy($id)
    {
        $instructor = User::findOrFail($id);

        $deleted = $instructor->delete();

        return [$deleted, $instructor->name . " deleted", $instructor];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $instructor = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($instructor->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $instructor->delete();

        return [$deleted, $instructor->name . " deleted"];
    }
}
