<?php

namespace App\Http\Controllers;

use App\Http\Services\DiscussionForumRatingService;
use App\Models\DiscussionForumRating;
use Illuminate\Http\Request;

class DiscussionForumRatingController extends Controller
{
    public function __construct(protected DiscussionForumRatingService $service)
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
            "discussionForumId" => "required|integer",
            "rating" => "required|integer",
        ]);

        [$rating, $message, $saved] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $rating,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DiscussionForumRating  $discussionForumRating
     * @return \Illuminate\Http\Response
     */
    public function show(DiscussionForumRating $discussionForumRating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DiscussionForumRating  $discussionForumRating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DiscussionForumRating $discussionForumRating)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DiscussionForumRating  $discussionForumRating
     * @return \Illuminate\Http\Response
     */
    public function destroy(DiscussionForumRating $discussionForumRating)
    {
        //
    }
}
