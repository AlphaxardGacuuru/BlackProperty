<?php

namespace App\Http\Services;

use App\Http\Resources\TenantResource;
use App\Http\Services\Service;
use App\Models\Unit;
use App\Models\User;
use App\Models\UserCourse;
use App\Models\UserDepartment;
use App\Models\UserFaculty;
use App\Models\UserUnit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TenantService extends Service
{
    /*
     * Get All Tenants
     */
    public function index($request)
    {
        $courseId = $request->input("courseId");

        if ($request->filled("idAndName")) {
            $tenants = User::with("courses")
                ->where("account_type", "tenant")
                ->whereHas("courses", function ($query) use ($courseId) {
                    $query->where("course_id", $courseId);
                })
                ->orderBy("id", "DESC")
                ->get();

            return response([
                "data" => $tenants,
            ], 200);
        }

        $tenants = User::where("account_type", "tenant")
            ->orderBy("id", "DESC")
            ->paginate(20);

        return TenantResource::collection($tenants);
    }

    /*
     * Get One Tenant
     */
    public function show($id)
    {
        $tenant = User::findOrFail($id);

        return new TenantResource($tenant);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $tenant = new User;
        $tenant->name = $request->input("name");
        $tenant->email = $request->input("email");
        $tenant->phone = $request->input("phone");
        $tenant->gender = $request->input("gender");
        $tenant->current_location = $request->input("currentLocation");
        $tenant->origin_location = $request->input("originLocation");
        $tenant->education = $request->input("education");
        $tenant->password = Hash::make($request->input("email"));
        $tenant->account_type = "tenant";

        $saved = DB::transaction(function () use ($tenant, $request) {
            $saved = $tenant->save();

            // Add UserFaculty
            if ($request->filled("facultyId")) {
                $userFaculty = new UserFaculty;
                $userFaculty->user_id = $tenant->id;
                $userFaculty->faculty_id = $request->input("facultyId");
                $userFaculty->save();
            }

            // Add UserDepartment
            if ($request->filled("departmentId")) {
                $userDepartment = new UserDepartment;
                $userDepartment->user_id = $tenant->id;
                $userDepartment->department_id = $request->input("departmentId");
                $userDepartment->save();
            }

            // Add UserCourse
            if ($request->filled("courseIds")) {
                foreach ($request->courseIds as $courseId) {
                    $userUnit = new UserCourse;
                    $userUnit->user_id = $tenant->id;
                    $userUnit->course_id = $courseId;
                    $userUnit->save();
                }
            }

            // Add UserUnit
            if ($request->filled("unitId")) {
                $userUnit = new UserUnit;
                $userUnit->user_id = $tenant->id;
                $userUnit->unit_id = $request->input("unitId");
                $userUnit->save();
            }

            return $saved;
        });

        $message = $tenant->name . " created successfully";

        return [$saved, $message, $tenant];
    }

    /*
     * Update Tenant
     */
    public function update($request, $id)
    {
        $tenant = User::findOrFail($id);

        if ($request->filled("name")) {
            $tenant->name = $request->input("name");
        }

        if ($request->filled("email")) {
            $tenant->email = $request->input("email");
        }

        if ($request->filled("phone")) {
            $tenant->phone = $request->input("phone");
        }

        if ($request->filled("gender")) {
            $tenant->gender = $request->input("gender");
        }

        if ($request->filled("originLocation")) {
            $tenant->origin_location = $request->input("originLocation");
        }

        if ($request->filled("currentLocation")) {
            $tenant->current_location = $request->input("currentLocation");
        }

        if ($request->filled("education")) {
            $tenant->education = $request->input("education");
        }

        if ($request->filled("password")) {
            $tenant->password = Hash::make($request->input("email"));
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
                $userFaculty->user_id = $tenant->id;
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
                $userDepartment->user_id = $tenant->id;
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
                $userUnit->user_id = $tenant->id;
                $userUnit->unit_id = $request->input("unitId");
                $userUnit->save();
            }
        }

        $saved = $tenant->save();

        $message = $tenant->name . " updated successfully";

        return [$saved, $message, $tenant];
    }

    /*
     * Soft Delete Service
     */
    public function destroy($id)
    {
        $tenant = User::findOrFail($id);

        $deleted = $tenant->delete();

        return [$deleted, $tenant->name . " deleted", $tenant];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $tenant = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($tenant->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $tenant->delete();

        return [$deleted, $tenant->name . " deleted"];
    }

    /*
     * Get Tenants by Property ID
     */
    public function byPropertyId($id)
    {
        $tenants = Unit::with("tenants")
            ->where("property_id", $id)
            // ->select("users.*")
            ->orderBy("id", "DESC")
            ->paginate(20);

        return TenantResource::collection($tenants);
    }
}
