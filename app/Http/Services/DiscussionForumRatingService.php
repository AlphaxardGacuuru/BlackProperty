<?php

namespace App\Http\Services;

use App\Models\DiscussionForum;
use App\Models\DiscussionForumRating;
use Illuminate\Support\Facades\DB;

class DiscussionForumRatingService extends Service
{
    /*
     * Store
     */
    public function store($request)
    {
        $getRating = DiscussionForumRating::where("discussion_forum_id", $request->discussionForumId)
            ->where("user_id", $this->id);

        $hasRated = $getRating->exists();

        // Check if user has rated
        if ($hasRated) {
            // Get Rating
            $rating = $getRating->first();

            DB::transaction(function () use ($getRating) {
                // Increment Club Votes
                DiscussionForum::find($getRating->first()->discussion_forum_id)->decrement("ratings");
                // Delete Rating
                $getRating->delete();
            });

            $saved = false;
            $message = "Rating Removed";
        } else {
            $rating = new DiscussionForumRating;
            $rating->discussion_forum_id = $request->discussionForumId;
            $rating->user_id = $this->id;
            $rating->rating = $request->rating;

            DB::transaction(function () use ($rating) {
                $rating->save();

                // Increment Club Votes
                DiscussionForum::find($rating->discussion_forum_id)->increment("ratings");
            });

            $saved = true;
            $message = "Rating Saved";
        }

        return [$saved, $message, $rating];
    }
}
