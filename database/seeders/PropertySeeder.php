<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::limit(1)->get();

        foreach ($users as $user) {
            Property::factory()
                ->count(5)
                ->hasUnits(rand(5, 20))
                ->create(["user_id" => $user->id]);
        }
    }
}
