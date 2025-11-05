<?php

namespace Database\Seeders;

use App\Models\Unit;
use App\Models\UserUnit;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $units = Unit::all();

        foreach ($units as $unit) {
            for ($i = 0; $i < rand(3, 5); $i++) {
                if ($i == 0) {
                    $userUnit = UserUnit::factory()
                        ->create([
                            "unit_id" => $unit->id,
                        ]);

                    // Set Unit as occupied
                    $unit = $userUnit->unit;
                    $unit->status = "occupied";
                    $unit->save();
                } else {
                    UserUnit::factory()
                        ->create([
                            "unit_id" => $unit->id,
                            "occupied_at" => Carbon::now()->subMonth(10 - $i)->startOfMonth(),
                            "vacated_at" => Carbon::now()->subMonth(5 - $i)->endOfMonth(),
                        ]);
                }
            }
        }
    }
}
