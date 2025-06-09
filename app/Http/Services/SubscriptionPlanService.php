<?php

namespace App\Http\Services;

use App\Models\SubscriptionPlan;

class SubscriptionPlanService extends Service
{
	/**
	 * Get all subscription plans.
	 *
	 */
	public function index()
	{
		return SubscriptionPlan::all();
	}
}
