<?php

namespace Database\Seeders;

use App\Models\Billable;
use App\Models\Course;
use Illuminate\Database\Seeder;

class BillableSeeder extends Seeder
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
            Billable::factory()
                ->create([
                    "course_id" => $course->id,
                ]);
        }
    }
}
