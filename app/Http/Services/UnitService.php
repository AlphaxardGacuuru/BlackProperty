<?php

namespace App\Http\Services;

use App\Http\Resources\UnitResource;
use App\Http\Services\Service;
use App\Models\Unit;
use App\Models\User;
use App\Models\UserUnit;

class UnitService extends Service
{
    /*
     * Get All Units
     */
    public function index($request)
    {
        if ($request->filled("idAndName")) {
            $units = Unit::select("id", "name", "code", "course_id as courseId")
                ->orderBy("id", "DESC")
                ->get();

            return response([
                "data" => $units,
            ], 200);
        }

        $units = Unit::orderBy("id", "DESC")->paginate(20);

        return UnitResource::collection($units);
    }

    /*
     * Get One Unit
     */
    public function show($id)
    {
        $unit = Unit::findOrFail($id);

        return new UnitResource($unit);
    }

    /*
     * Store Unit
     */
    public function store($request)
    {
        $unit = new Unit;
        $unit->name = $request->input("name");
        $unit->code = $request->input("code");
        $unit->description = $request->input("description");
        $unit->year = $request->input("year");
        $unit->semester = $request->input("semester");
        $unit->credits = $request->input("credits");
        $unit->course_id = $request->input("courseId");

        $saved = $unit->save();

        if ($request->filled("instructorIds")) {
            foreach ($request->instructorIds as $instructorId) {
                $userUnit = new UserUnit;
                $userUnit->user_id = $instructorId;
                $userUnit->unit_id = $unit->id;
                $userUnit->save();
            }
        }

        $message = $unit->name . " created successfully";

        return [$saved, $message, $unit];
    }

    /*
     * Update
     */
    public function update($request, $id)
    {
        $unit = Unit::findOrFail($id);

        if ($request->filled("name")) {
            $unit->name = $request->input("name");
        }

        if ($request->filled("code")) {
            $unit->code = $request->input("code");
        }

        if ($request->filled("description")) {
            $unit->description = $request->input("description");
        }

        if ($request->filled("year")) {
            $unit->year = $request->input("year");
        }

        if ($request->filled("semester")) {
            $unit->semester = $request->input("semester");
        }

        if ($request->filled("credits")) {
            $unit->credits = $request->input("credits");
        }

        if (count($request->instructorIds) > 0) {
            foreach ($request->instructorIds as $instructorId) {
                // Check if instructor already exists
                $userUnitDoesntExist = UserUnit::where("unit_id", $unit->id)
                    ->where("user_id", $instructorId)
                    ->where("academic_session_id", $request->input("sessionId"))
                    ->doesntExist();

                if ($userUnitDoesntExist) {
                    $userUnit = new UserUnit;
                    $userUnit->user_id = $instructorId;
                    $userUnit->unit_id = $unit->id;
                    $userUnit->academic_session_id = $request->input("sessionId");
                    $userUnit->save();
                } else {
                    // Remove instructors not included
                    UserUnit::where("unit_id", $unit->id)
                        ->whereNotIn("user_id", $request->instructorIds)
                        ->delete();
                }
            }
        } else {
            // Remove instructors not included
            UserUnit::where("unit_id", $unit->id)
                ->delete();
        }

        $saved = $unit->save();

        $message = $unit->name . " updated successfully";

        return [$saved, $message, $unit];
    }

    /*
     * Destroy
     */
    public function destory($id)
    {
        $unit = Unit::findOrFail($id);

        $deleted = $unit->delete();

        $message = $unit->name . " deleted successfully";

        return [$deleted, $message, $unit];
    }

    /*
     * By User ID
     */
    public function byUserId($id)
    {
        // Retrieve the user by ID with its associated units
        $user = User::with('units')->find($id);

        // Access the units related to the user
        $units = $user->units;

        return UnitResource::collection($units);
    }
}
