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
		Schema::create('emails', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_unit_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			$table->foreignId('invoice_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			$table->jsonb("model");
			$table->string("email");
			$table->string("status")->nullable();
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
		Schema::dropIfExists('emails');
	}
};
