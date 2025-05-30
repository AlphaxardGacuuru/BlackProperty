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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")
                ->constrained()
                ->onUpdate("cascade")
                ->onDelete("cascade");
            $table->string("name");
            $table->string("location");
            $table->string("deposit_formula");
            $table->integer("service_charge")->default(0);
            $table->jsonb("water_bill_rate");
            $table->integer("unit_count")->default(0);
			$table->integer("invoice_date")->default(1);
			$table->boolean("email")->default(1);
			$table->boolean("sms")->default(1);
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
        Schema::dropIfExists('properties');
    }
};
