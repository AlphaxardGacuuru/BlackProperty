<?php

namespace Database\Seeders;

use App\Models\UserUnit;
use App\Models\WaterReading;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class WaterReadingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get the current month
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        $reading = rand(5, 10);

        // Loop from the current month back to January
        for ($month = $currentMonth; $month >= 1; $month--) {
            // Set the current date to the first day of the month
            $date = Carbon::create(null, $month, 1);

            // Get the start and end of the month
            $endOfMonth = $date->endOfMonth();

            // Fetch the user units for the current month
            $userUnits = UserUnit::where("vacated_at", "<=", $endOfMonth)
                ->orWhereNull("vacated_at")
                ->get();

            foreach ($userUnits as $key => $userUnit) {

                $lastMonth = $month - 1;

                // Get Last Water Reading
                $previousReadingQuery = WaterReading::where("user_unit_id", $userUnit->id)
                    ->where("month", $lastMonth)
                    ->where("year", $currentYear)
                    ->first();

                $previouReading = $previousReadingQuery ? $previousReadingQuery->reading : 0;

                $usage = $reading - $previouReading;

                $waterBillRate = UserUnit::find($userUnit->id)
                    ->unit
                    ->property
                    ->water_bill_rate;

                $bill = $usage * $waterBillRate;

                WaterReading::factory()
                    ->create([
                        "user_unit_id" => $userUnit->id,
                        "reading" => $reading,
                        "month" => $month,
                        "year" => $currentYear,
                        "usage" => $usage,
                        "bill" => $bill,
                    ]);
            }

            // Increment Reading
            $reading += rand(5, 10);
        }
    }
}
