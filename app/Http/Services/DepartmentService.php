<?php

namespace App\Http\Services;

use App\Http\Resources\DepartmentResource;
use App\Http\Services\Service;
use App\Models\Department;

class DepartmentService extends Service
{
    /*
     * Get All Departments
     */
    public function index()
    {
        $departments = Department::orderBy("id", "DESC")->get();

        return DepartmentResource::collection($departments);
    }

    /*
     * Get One Department
     */
    public function show($id)
    {
        $department = Department::findOrFail($id);

        return new DepartmentResource($department);
    }

    /*
     * Store Department
     */
    public function store($request)
    {
        $department = new Department;
        $department->name = $request->input("name");
        $department->faculty_id = $request->input("facultyId");

        $saved = $department->save();

        $message = $department->name . " created successfully";

        return [$saved, $message, $department];
    }

    /*
     * Update Department
     */
    public function update($request, $id)
    {
        $department = Department::findOrFail($id);

        if ($request->filled("name")) {
            $department->name = $request->input("name");
        }

        if ($request->filled("facultyId")) {
            $department->faculty_id = $request->input("facultyId");
        }

        $saved = $department->save();

        $message = $department->name . " created successfully";

        return [$saved, $message, $department];
    }

    /*
     * Destroy
     */
    public function destroy($id)
    {
        $department = Department::findOrFail($id);

        $deleted = $department->delete();

        $message = $department->name . " deleted successfully";

        return [$deleted, $message, $department];
    }
}
