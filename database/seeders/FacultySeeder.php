<?php

namespace Database\Seeders;

use App\Models\Faculty;
use Illuminate\Database\Seeder;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Faculty names
        $faculties = [
            "Arts",
            "Science",
            "Social Sciences",
            "Business",
            "Law",
            "Education",
            "Technology",
            "Architecture and Design",
        ];

        foreach ($faculties as $faculty) {
            Faculty::factory()->create(["name" => $faculty]);
        }
    }
}
