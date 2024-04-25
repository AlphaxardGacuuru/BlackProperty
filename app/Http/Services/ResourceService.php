<?php

namespace App\Http\Services;

use App\Http\Resources\ResourceResource;
use App\Models\Resource;

class ResourceService extends Service
{
    /*
     * Show All Resources
     */
    public function index()
    {
        $resources = Resource::orderBy("id", "DESC")->paginate(20);

        return ResourceResource::collection($resources);
    }

	/*
	* Get One Resource
	*/ 
	public function show($id)
	{
		$resource = Resource::find($id);

		return new ResourceResource($resource);
	}

    /*
     * Store Resource
     */
    public function store($request)
    {
        $resource = new Resource;
        $resource->name = $request->name;
        $resource->link = $request->link;

        $saved = $resource->save();

        $message = $resource->name . " saved";

        return [$saved, $message, $resource];
    }

    /*
     * Update Resource
     */
    public function update($request, $id)
    {
        $resource = Resource::find($id);

        if ($request->filled("name")) {
            $resource->name = $request->name;
        }

        if ($request->filled("link")) {
            $resource->link = $request->link;
        }

        $saved = $resource->save();

        $message = $resource->name . " saved";

        return [$saved, $message, $resource];
    }

    /*
     * Destory Resource
     */
    public function destory($id)
    {
        $resource = Resource::find($id);

        $deleted = $resource->delete();

        $message = $resource->name . " deleted";

        return [$deleted, $message, $resource];
    }
}
