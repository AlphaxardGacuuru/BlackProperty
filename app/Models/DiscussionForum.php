<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscussionForum extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'updated_at' => 'datetime:d M Y',
        'created_at' => 'datetime:d M Y',
    ];

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function attachment(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? "storage/" . $value : null
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y H:ia'),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y H:ia'),
        );
    }

    /*
     * Relationships
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ratings()
    {
        return $this->hasMany(DiscussionForumRating::class, "discussion_forum_id", "id");
    }

    /*
     * Custom Functions
     */

    // Check if Club is Booked
    public function hasRated($id)
    {
        return $this->ratings()
            ->where('user_id', $id)
            ->first();
    }

    // Calculate Rating
    public function rating()
    {
        $ones = $this->ratings()
            ->where("rating", 10)
            ->count();

        $twos = $this->ratings()
            ->where("rating", 20)
            ->count();

        $threes = $this->ratings()
            ->where("rating", 30)
            ->count();

        $fours = $this->ratings()
            ->where("rating", 40)
            ->count();

        $fives = $this->ratings()
            ->where("rating", 50)
            ->count();

        $sixes = $this->ratings()
            ->where("rating", 60)
            ->count();

        $sevens = $this->ratings()
            ->where("rating", 70)
            ->count();

        $eights = $this->ratings()
            ->where("rating", 80)
            ->count();

        $nines = $this->ratings()
            ->where("rating", 90)
            ->count();

        $tens = $this->ratings()
            ->where("rating", 100)
            ->count();

        $total = $this->ratings()->count();

        // Get average but check if total is greater than zero
        if ($total) {

            $rating =
                ($ones * 10) +
                ($twos * 20) +
                ($threes * 30) +
                ($fours * 40) +
                ($fives * 50) +
                ($sixes * 60) +
                ($sevens * 70) +
                ($eights * 80) +
                ($nines * 90) +
                ($tens * 100);

            return round($rating / $total, 1);
        }
    }
}
