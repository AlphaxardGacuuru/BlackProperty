<?php

namespace App\Http\Services;

use App\Http\Resources\DiscussionForumResource;
use App\Models\DiscussionForum;
use Illuminate\Support\Facades\Storage;

class DiscussionForumService extends Service
{
    /*
     * Get Discussion Forum
     */
    public function show($request, $id)
    {
        $getDiscussionForum = DiscussionForum::where("unit_id", $id)
            ->where("academic_session_id", $request->input("sessionId"))
            ->get();

        return DiscussionForumResource::collection($getDiscussionForum);
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store($request)
    {
        /* Create new post */
        $discussionForum = new DiscussionForum;
        $discussionForum->academic_session_id = $request->input("id");
        $discussionForum->unit_id = $request->input("to");
        $discussionForum->week = $request->input("week");
        $discussionForum->user_id = $this->id;
        $discussionForum->text = $request->input('text');
        $discussionForum->attachment = $request->input("attachment");

        $saved = $discussionForum->save();

        return [$saved, "Chat sent", $discussionForum];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $discussionForum = DiscussionForum::find($id);

        // Delete Media
        $attachment = substr($discussionForum->attachment, 8);

        Storage::disk("public")->delete($attachment);

        $deleted = $discussionForum->delete();

        return [$deleted, "Chat deleted"];
    }
}
