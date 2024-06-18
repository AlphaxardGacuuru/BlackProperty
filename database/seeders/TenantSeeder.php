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
                    UserUnit::factory()
                        ->create([
                            "unit_id" => $unit->id,
                        ]);
                } else {
                    UserUnit::factory()
                        ->create([
                            "unit_id" => $unit->id,
                            "occupied_at" => Carbon::now()->subMonth($i+2)->startOfMonth(),
                            "vacated_at" => Carbon::now()->subMonth($i+1)->endOfMonth(),
                        ]);
                }
            }
        }
    }
}
