<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\User;
use App\Models\UserProperty;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $properties = Property::all();

        foreach ($properties as $key => $property) {
            UserProperty::factory()
                ->create([
                    "user_id" => User::all()->random()->id,
                    "property_id" => $property->id,
                ]);
        }
    }
}
