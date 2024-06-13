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
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->foreignId("property_id")
                ->constrained()
                ->onUpdate("cascade")
                ->onDelete("cascade");
            $table->string("name");
            $table->integer("rent");
            $table->integer("deposit");
            $table->integer("bedrooms")->nullable();
            $table->jsonb("size")->nullable();
            $table->string("type")->default("apartment");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('units');
    }
};
