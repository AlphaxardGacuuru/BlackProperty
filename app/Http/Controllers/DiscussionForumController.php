<?php

namespace App\Http\Controllers;

use App\Events\DiscussionForumChatCreatedEvent;
use App\Http\Services\DiscussionForumService;
use App\Models\DiscussionForum;
use Illuminate\Http\Request;

class DiscussionForumController extends Controller
{
	public function __construct(protected DiscussionForumService $service)
	{
		// 
	}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
			"id" => "required|integer",
			"to" => "required|integer",
			"text" => "required|string|max:65535",
			"attachment" => "nullable|string",
			"week" => "required|integer"
		]);

		[$saved, $message, $discussionForum] = $this->service->store($request);

		DiscussionForumChatCreatedEvent::dispatchIf($saved, $discussionForum);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $discussionForum
		], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DiscussionForum  $discussionForum
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        return $this->service->show($request, $id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DiscussionForum  $discussionForum
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DiscussionForum $discussionForum)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DiscussionForum  $discussionForum
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        DiscussionForumChatCreatedEvent::dispatchIf($deleted, $id);

        return response([
            "status" => $deleted,
            "message" => $message,
        ], 200);
    }
}
