<?php

namespace App\Http\Services;

use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleService extends Service
{
    /*
     * Get All Roles
     */
    public function index()
    {
        $getRoles = Role::orderby("id", "DESC")->get();

        return RoleResource::collection($getRoles);
    }

    /*
     * Get Role
     */
    public function show($id)
    {
        $getRole = Role::find($id);

        return new RoleResource($getRole);
    }

    /*
     * Store Role
     */
    public function store($request)
    {
        $role = new Role;
        $role->name = $request->input("name");
        $role->description = $request->input("description");
        $role->permissions = $request->input("permissions");
        $saved = $role->save();

        $message = $role->name . ' created successfully!';

        return [$saved, $message, $role];
    }

    /*
     * Update Role
     */
    public function update($request, $id)
    {

        $role = Role::find($id);

        if ($request->filled("name")) {
            $role->name = $request->input("name");
        }

        if ($request->filled("description")) {
            $role->description = $request->input("description");
        }

        if ($request->filled("permissions")) {
            $role->permissions = $request->input("permissions");
        }

        $saved = $role->save();

        $message = $role->name . " updated";

        return [$saved, $message, $role];
    }

    /*
     * Destroy Role
     */
    public function destroy($id)
    {
        $role = Role::find($id);

        $deleted = $role->delete();

        $message = $role->name . " deleted";

        return [$deleted, $message, $role];
    }
}
