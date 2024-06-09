<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('water_readings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_unit_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->integer('reading');
            $table->integer('month');
            $table->integer('year');
            $table->integer('usage');
            $table->integer('bill');
            $table->timestamps();

            $table->unique(["user_unit_id", "month", "year"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('water_readings');
    }
};
