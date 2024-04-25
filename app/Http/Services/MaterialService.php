<?php

namespace App\Http\Services;

use App\Http\Resources\MaterialResource;
use App\Models\Material;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class MaterialService extends Service
{
    /*
     * Get One Material
     */
    public function show($id)
    {
        $material = Material::findOrFail($id);

        return new MaterialResource($material);
    }

    /*
     * Store Material
     */
    public function store($request)
    {
        $material = new Material;
        $material->title = $request->input("title");
        $material->description = $request->input("description");
        $material->week = $request->input("week");
        $material->starts_at = $request->input("startsAt");
        $material->ends_at = $request->input("endsAt");
        $material->type = $request->input("type");
        $material->rich_text = $request->input("richText");
        $material->media = $request->input("media");
        $material->unit_id = $request->input("unitId");

        $saved = $material->save();

        $message = $material->title . " saved successfully";

        return [$saved, $message, $material];
    }

    /*
     * Update Material
     */
    public function update($request, $id)
    {
        $material = Material::findOrFail($id);

        if ($request->input("title")) {
            $material->title = $request->input("title");
        }

        if ($request->input("description")) {
            $material->description = $request->input("description");
        }

        if ($request->input("week")) {
            $material->week = $request->input("week");
        }

        if ($request->input("startsAt")) {
            $material->starts_at = $request->input("startsAt");
        }

        if ($request->input("endsAt")) {
            $material->ends_at = $request->input("endsAt");
        }

        if ($request->input("type")) {
            $material->type = $request->input("type");
        }

        if ($request->input("richText")) {
            $material->rich_text = $request->input("richText");
        }

        if ($request->input("media")) {

            // Get old media and delete it
            $oldMedia = substr($material->media, 9);

            Storage::disk("public")->delete($oldMedia);

            $material->media = $request->input("media");
        }

        $saved = $material->save();

        $message = $material->title . " updated successfully";

        return [$saved, $message, $material];
    }

    /*
     * Destroy Material
     */
    public function destroy($id)
    {
        $material = Material::findOrFail($id);

        // Delete Media
        $media = substr($material->media, 8);

        Storage::disk("public")->delete($media);

        $deleted = $material->delete();

        $message = $material->title . " deleted successfully";

        return [$deleted, $message, $material];
    }

    /*
     * Get Materials By Unit
     */
    public function byUnitId($id)
    {
        $materials = Material::where('unit_id', $id)
            ->orderBy("week")
            ->get()
            ->groupBy('week')
            ->map(function ($materials, $week) {
                // Format Date
                $startsAt = $materials->first()->starts_at;
                $endsAt = $materials->first()->ends_at;

                $endsAt2 = Carbon::parse($endsAt)->addDay();

                $startsAt = $startsAt ? Carbon::parse($startsAt)->format('d M Y') : null;
                $endsAt2 = $endsAt2 ? $endsAt2->format('d M Y') : null;
                $endsAt = $endsAt ? Carbon::parse($endsAt)->format('d M Y') : null;

                // Check if the current date is within the date range
                $isWithinRange = Carbon::now()->between($startsAt, $endsAt2);

                return [
                    "week" => $week,
                    "range" => $startsAt . " - " . $endsAt,
                    "isActive" => $isWithinRange,
                    "materials" => MaterialResource::collection($materials),
                ];
            })
            ->values()
            ->all();

        return response([
            "data" => $materials,
        ], 200);
    }
}
