<?php

namespace App\Http\Services;

use App\Http\Resources\StaffResource;
use App\Http\Services\Service;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StaffService extends Service
{
    /*
     * Get All Staff
     */
    public function index()
    {
        $staff = User::where("account_type", "staff")
            ->orderBy("id", "DESC")
            ->get();

        return StaffResource::collection($staff);
    }

    /*
     * Get One Staff
     */
    public function show($id)
    {
        $staff = User::findOrFail($id);

        return new StaffResource($staff);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $staff = new User;
        $staff->name = $request->input("name");
        $staff->email = $request->input("email");
        $staff->phone = $request->input("phone");
        $staff->gender = $request->input("gender");
        $staff->current_location = $request->input("currentLocation");
        $staff->origin_location = $request->input("originLocation");
        $staff->password = Hash::make($request->input("email"));
        $staff->account_type = "staff";

        DB::transaction(function () use ($staff, $request) {
            $staff->save();

            foreach ($request->userRoles as $roleId) {
                $userRole = new UserRole();
                $userRole->user_id = $staff->id;
                $userRole->role_id = $roleId;
                $userRole->save();
            }

        });

        $saved = $staff->save();

        $message = $staff->name . " created successfully";

        return [$saved, $message, $staff];
    }

    /*
     * Update Staff
     */
    public function update($request, $id)
    {
        $staff = User::findOrFail($id);

        if ($request->filled("name")) {
            $staff->name = $request->input("name");
        }

        if ($request->filled("email")) {
            $staff->email = $request->input("email");
        }

        if ($request->filled("phone")) {
            $staff->phone = $request->input("phone");
        }

        if ($request->filled("gender")) {
            $staff->gender = $request->input("gender");
        }

        if ($request->filled("originLocation")) {
            $staff->origin_location = $request->input("originLocation");
        }

        if ($request->filled("currentLocation")) {
            $staff->current_location = $request->input("currentLocation");
        }

        if ($request->filled("password")) {
            $staff->password = Hash::make($request->input("email"));
        }

        if (count($request->input("userRoles")) > 0) {
            foreach ($request->input("userRoles") as $roleId) {
                // Check if role already exists
                $userRoleDoesntExist = UserRole::where("user_id", $staff->id)
                    ->where("role_id", $roleId)
                    ->doesntExist();

                if ($userRoleDoesntExist) {
                    $userRole = new UserRole();
                    $userRole->user_id = $staff->id;
                    $userRole->role_id = $roleId;
                    $userRole->save();
                } else {
                    // Remove roles not included
                    UserRole::where("user_id", $staff->id)
                        ->whereNotIn("role_id", $request->userRoles)
                        ->delete();
                }
            }
        } else {
            // Remove roles not included
            UserRole::where("user_id", $staff->id)
                ->delete();
        }

        $saved = $staff->save();

        $message = $staff->name . " updated successfully";

        return [$saved, $message, $staff];
    }

    /*
     * Soft Delete Service
     */
    public function destroy($id)
    {
        $staff = User::findOrFail($id);

        $deleted = $staff->delete();

        return [$deleted, $staff->name . " deleted", $staff];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $staff = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($staff->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $staff->delete();

        return [$deleted, $staff->name . " deleted"];
    }
}
