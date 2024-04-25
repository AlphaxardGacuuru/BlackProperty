<?php

namespace App\Http\Services;

use App\Http\Resources\FacultyResource;
use App\Http\Services\Service;
use App\Models\Faculty;

class FacultyService extends Service
{
    /*
     * Get All Faculties
     */
    public function index()
    {
        $faculties = Faculty::orderBy("id", "DESC")->get();

        return FacultyResource::collection($faculties);
    }

    /*
     * Get One Faculty
     */
    public function show($id)
    {
        $faculty = Faculty::findOrFail($id);

        return new FacultyResource($faculty);
    }

    /*
     * Store Faculty
     */
    public function store($request)
    {
        $faculty = new Faculty;
        $faculty->name = $request->input("name");

        $saved = $faculty->save();

        $message = $faculty->name . " created successfully";

        return [$saved, $message, $faculty];
    }

    /*
     * Update Faculty
     */
    public function update($request, $id)
    {
        $faculty = Faculty::findOrFail($id);

        if ($request->filled("name")) {
            $faculty->name = $request->input("name");
        }

        $saved = $faculty->save();

        $message = $faculty->name . " created successfully";

        return [$saved, $message, $faculty];
    }

    /*
     * Destroy
     */
    public function destroy($id)
    {
        $faculty = Faculty::findOrFail($id);

        $deleted = $faculty->delete();

        $message = $faculty->name . " deleted successfully";

        return [$deleted, $message, $faculty];
    }
}
