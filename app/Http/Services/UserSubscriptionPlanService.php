<?php

namespace App\Http\Services;

use App\Models\UserSubscriptionPlan;

class UserSubscriptionPlanService extends Service
{
	/**
	 * Get all user subscription plans.
	 *
	 */
	public function index($request)
	{
		$query = new UserSubscriptionPlan;

		$query = $this->search($query, $request);

		$userSubscriptionPlans = $query->orderBy("id", "DESC")
			->paginate();

		return $userSubscriptionPlans;
	}

	public function store($request)
	{
		if ($request->save) {
			$userSubscriptionPlan = UserSubscriptionPlan::where("user_id", auth("sanctum")->id())
				->where("status", "pending")
				->first();

			$userSubscriptionPlan = $userSubscriptionPlan ?? new UserSubscriptionPlan;
			$userSubscriptionPlan->user_id = auth("sanctum")->id();
			$userSubscriptionPlan->subscription_plan_id = $request->subscriptionPlanId;
			$userSubscriptionPlan->amount_paid = $request->amountPaid;
			$userSubscriptionPlan->start_date = now();
			$userSubscriptionPlan->end_date = now()->addMonths($request->duration);
			$userSubscriptionPlan->status = "pending";
			$saved = $userSubscriptionPlan->save();
		} else {
			$userSubscriptionPlan = UserSubscriptionPlan::where("user_id", auth("sanctum")->user()->id)
				->where("subscription_plan_id", $request->subscriptionPlanId)
				->where("status", "pending")
				->first();

			$saved = $userSubscriptionPlan->delete();
		}

		return [$saved, 'Subscription Plan Updated Successfully.', $userSubscriptionPlan];
	}

	/**
	 * Subscribe or update user subscription plan.
	 *
	 */
	public function search($query, $request)
	{
		if ($request->userId) {
			$query = $query->where("user_id", $request->userId);
		}

		if ($request->status) {
			$query = $query->where("status", $request->status);
		}

		return $query;
	}
}
