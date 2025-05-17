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
		Schema::create('deductions', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_unit_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			$table->longText('description')->nullable();
			$table->integer('amount');
			$table->integer('month');
			$table->integer('year');
			$table->unsignedBigInteger('created_by');
			$table->timestamps();

			$table->foreign('created_by')
				->references('id')
				->on('users')
				->onUpdate('cascade')
				->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('deductions');
	}
};
