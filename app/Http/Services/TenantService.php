<?php

namespace App\Http\Services;

use App\Http\Resources\TenantResource;
use App\Http\Services\Service;
use App\Models\User;
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
        $tenantQuery = User::where("email", $request->email);

        // Check if User exists
        $doesntExist = User::where("email", $request->email)->doesntExist();

        if ($doesntExist) {
            $tenant = new User;
            $tenant->name = $request->input("name");
            $tenant->email = $request->input("email");
            $tenant->phone = $request->input("phone");
            $tenant->gender = $request->input("gender");
            $tenant->password = Hash::make($request->input("email"));
            $tenant->account_type = "tenant";
        } else {
            $tenant = $tenantQuery->first();

            // Check if user is occupying elsewhere
            $alreadyATenantElsewhere = UserUnit::where("user_id", $tenant->id)
                ->whereNull("vacated_at")
                ->exists();

            if ($alreadyATenantElsewhere) {
                return ["error", "User already a tenant elsewhere", "", 422];
            }
        }

        $saved = DB::transaction(function () use ($tenant, $request) {
            $saved = $tenant->save();

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

        return [$saved, $message, $tenant, 200];
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

        if ($request->filled("password")) {
            $tenant->password = Hash::make($request->input("email"));
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
     * Get Tenants by Unit ID
     */
    public function byUnitId($id)
    {
        return $tenants = User::whereHas('units', function ($query) use ($id) {
            $query->where('unit_id', $id);
        })
            ->paginate(20);

        return TenantResource::collection($tenants);
    }
}
