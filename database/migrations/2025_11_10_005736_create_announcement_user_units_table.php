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
		Schema::create('announcement_user_units', function (Blueprint $table) {
			$table->id();
			$table->foreignId('announcement_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			$table->foreignId('user_unit_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
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
		Schema::dropIfExists('announcement_user_units');
	}
};
