<?php

namespace App\Http\Services;

use App\Http\Resources\StaffResource;
use App\Http\Services\Service;
use App\Models\User;
use App\Models\UserProperty;
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
            ->paginate(20);

        return StaffResource::collection($staff);
    }

    /*
     * Get One Staff
     */
    public function show($id)
    {
        $staff = UserProperty::where("user_id", $id)
            ->firstOrFail();

        return new StaffResource($staff);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $staffQuery = User::where("email", $request->email);

        // Check if User exists
        $doesntExist = $staffQuery->doesntExist();

        if ($doesntExist) {
            $staff = new User;
            $staff->name = $request->input("name");
            $staff->email = $request->input("email");
            $staff->phone = $request->input("phone");
            $staff->gender = $request->input("gender");
            $staff->password = Hash::make($request->input("email"));
        } else {
            $staff = $staffQuery->first();

            // Check if staff already exists
            $staffExists = UserProperty::where("user_id", $staff->id)
                ->where("property_id", $request->propertyId)
                ->exists();

            if ($staffExists) {
                return [false, "Staff already exists", "", 422];
            }
        }

        $saved = DB::transaction(function () use ($request, $staff) {
            $saved = $staff->save();

            $userProperty = new UserProperty;
            $userProperty->user_id = $staff->id;
            $userProperty->property_id = $request->propertyId;
            $userProperty->save();

            foreach ($request->userRoles as $roleId) {
                $userRole = new UserRole();
                $userRole->user_id = $staff->id;
                $userRole->role_id = $roleId;
                $userRole->save();
            }

            return $saved;
        });

        $message = $staff->name . " added successfully";

        return [$saved, $message, $staff, 200];
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

        if ($request->filled("password")) {
            $staff->password = Hash::make($request->input("email"));
        }

        if ($request->filled("userRoles")) {
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
        }

        $saved = $staff->save();

        $message = $staff->name . " updated successfully";

        return [$saved, $message, $staff];
    }

    /*
     * Soft Delete Service
     */
    public function destroy($request, $id)
    {
        $staff = UserProperty::where("user_id", $id)
            ->where("property_id", $request->input("propertyId"))
            ->firstOrFail();

        $deleted = $staff->delete();

        return [$deleted, $staff->user->name . " deleted successfully", $staff];
    }

    /*
     * Get Staff by Property ID
     */
    public function byPropertyId($id)
    {
        $ids = explode(",", $id);

        $staff = UserProperty::whereIn("property_id", $ids)
            ->paginate(20);

        return StaffResource::collection($staff);
    }
}
