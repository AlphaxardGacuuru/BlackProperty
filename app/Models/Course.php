<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Course extends Model
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

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    /*
     * Relationships
     */

    public function courses()
    {
        return $this->belongsToMany(User::class, 'user_courses');
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }

    public function userCourses()
    {
        return $this->hasMany(UserCourse::class);
    }

	public function billables()
	{
		return $this->hasMany(Billable::class);
	}

    /*
     * Custom functions
     */

    public function instructors()
    {
        return $this->userCourses()
            ->get()
            ->map(fn($userCourse) => $userCourse->user()
                    ->where("account_type", "instructor")
                    ->first())
            ->filter();
    }

    public function students()
    {
        return $this->userCourses()
            ->get()
            ->map(fn($userCourse) => $userCourse->user()
                    ->where("account_type", "student")
                    ->first())
            ->filter();
    }

	public function admission()
	{
		return $this->billables()
		->where("name", "Admission Fee")
		->first()
		?->price;
	}
}
