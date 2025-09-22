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
        Schema::create('iprs_records', function (Blueprint $table) {
            $table->id();
			$table->string('national_id')->unique();
			$table->string('first_name')->nullable();
			$table->string('middle_name')->nullable();
			$table->string('last_name')->nullable();
			$table->datetime('date_of_birth')->nullable();
			$table->string('gender')->nullable();
			$table->string('citizenship')->nullable();
			$table->text('photo')->nullable(); // Base64 encoded image
			$table->string('marital_status')->nullable();
			$table->string('place_of_birth')->nullable();
			$table->string('county_of_residence')->nullable();
			$table->string('constituency')->nullable();
			$table->string('ward')->nullable();
			$table->string('village')->nullable();
			$table->string('nationality')->nullable();
			$table->datetime('id_issue_date')->nullable();
			$table->datetime('id_expiry_date')->nullable();
			$table->decimal('verification_score', 5, 2)->nullable();
			$table->json('parent_details')->nullable();
			$table->json('biometric_data')->nullable();
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
        Schema::dropIfExists('iprs_records');
    }
};
