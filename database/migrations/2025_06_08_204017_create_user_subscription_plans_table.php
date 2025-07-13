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
		Schema::create('user_subscription_plans', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			$table->foreignId('subscription_plan_id')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			$table->timestamp('start_date');
			$table->timestamp('end_date')->nullable();
			$table->string('status')->default('pending');
			$table->integer('amount_paid')->nullable();
			$table->string('billing_cycle')->default('monthly'); // Default billing cycle, can be 'monthly' or 'yearly'
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
		Schema::dropIfExists('user_subscription_plans');
	}
};
