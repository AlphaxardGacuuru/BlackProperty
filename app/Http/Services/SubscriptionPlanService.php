<?php

namespace App\Http\Services;

use App\Models\SubscriptionPlan;
use App\Models\UserSubscriptionPlan;

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

	public function subscribe($request)
	{
		$userSubscriptionPlan = new UserSubscriptionPlan;
		$userSubscriptionPlan->user_id = auth("sanctum")->user()->id;
		$userSubscriptionPlan->subscription_plan_id = $request->subscriptionPlanId;
		$userSubscriptionPlan->amount_paid = $request->amountPaid;
		$userSubscriptionPlan->start_date = now();
		$userSubscriptionPlan->end_date = now()->addMonths($request->duration);
		$userSubscriptionPlan->status = 'active';
		$saved = $userSubscriptionPlan->save();

		return [$saved, 'Subscription Plan Subscribed successfully.', $userSubscriptionPlan];
	}
}
