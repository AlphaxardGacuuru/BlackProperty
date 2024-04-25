<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = Course::all();

        foreach ($courses as $course) {
            Unit::factory()
                ->count(rand(40, 50))
                ->create([
                    "code" => substr($course->department->name, 0, 3) . "-" . rand(100, 999),
                    "course_id" => $course->id,
                ]);
        }
    }
}
