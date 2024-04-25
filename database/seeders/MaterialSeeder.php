<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $units = Unit::orderBy("id", "DESC")
            ->limit(1)
            ->get();

		// Define start and end dates
        $start_date = Carbon::parse('2024-01-04');
        $end_date = Carbon::parse('2024-04-30');

		// Initialize array to store week start and end dates
        $weeks = [];

		// Loop through each week and get start and end dates
        while ($start_date->lte($end_date)) {
            $week_start = $start_date->copy()->startOfWeek();
            $week_end = $start_date->copy()->endOfWeek();

            // Add start and end dates to array
            $weeks[] = [
                'startDate' => $week_start->format('Y-m-d'),
                'endDate' => $week_end->format('Y-m-d'),
            ];

            // Move to next week
            $start_date->addWeek();
        }

        $titles = [
            "Learning Guide",
            "Discussion Forum",
            "Written Assignment",
            "Learning Reflection",
            // "Self Quiz",
            // "CAT 1",
            // "CAT 2",
            // "Review Quiz",
            // "Final Exam",
        ];

        // Loop through each unit
        foreach ($units as $unit) {

            // Loop through weeks
            foreach ($weeks as $key => $week) {

                // Loop through titles
                foreach ($titles as $title) {
                    Material::factory()
                        ->create([
                            "title" => $title,
                            "week" => $key,
                            "unit_id" => $unit->id,
							"starts_at" => $week["startDate"],
							"ends_at" => $week["endDate"],
                        ]);
                }
            }
        }
    }
}
