<?php

namespace App\Http\Services;

use App\Models\UserSubscriptionPlan;
use Illuminate\Validation\ValidationException;

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

	public function show($id)
	{
		$userSubscriptionPlan = UserSubscriptionPlan::findOrFail($id);

		return $userSubscriptionPlan;
	}

	public function store($request)
	{
		// Check if the user is already subscribed to a plan
		$existingPlan = UserSubscriptionPlan::where("user_id", $request->userId)
			->where("status", "active")
			->first();

		if ($existingPlan) {
			// Throw Validation Exception if the user is already subscribed
			throw ValidationException::withMessages([
				"message" => "You are already subscribed to a plan.",
			]);
		}

		$userSubscriptionPlan = UserSubscriptionPlan::where("user_id", $request->userId)
			->where("status", "pending")
			->delete();

		$userSubscriptionPlan = new UserSubscriptionPlan;
		$userSubscriptionPlan->user_id = $request->userId;
		$userSubscriptionPlan->subscription_plan_id = $request->subscriptionPlanId;
		$userSubscriptionPlan->amount_paid = $request->amountPaid;
		$userSubscriptionPlan->start_date = now();
		$userSubscriptionPlan->end_date = now()->addMonths($request->duration);
		$userSubscriptionPlan->status = $request->input("status", "pending");
		$userSubscriptionPlan->type = $request->input("type");
		$saved = $userSubscriptionPlan->save();

		return [$saved, "Subscription Plan Updated Successfully.", $userSubscriptionPlan];
	}

	public function update($request, $id)
	{
		$userSubscriptionPlan = UserSubscriptionPlan::findOrFail($id);
		$userSubscriptionPlan->subscription_plan_id = $request->input("subscriptionPlanId", $userSubscriptionPlan->subscription_plan_id);
		$userSubscriptionPlan->amount_paid = $request->input("amountPaid", $userSubscriptionPlan->amount_paid);

		if ($request->filled("startDate")) {
			$userSubscriptionPlan->start_date = $request->input("startDate");
		}

		if ($request->filled("endDate")) {
			$userSubscriptionPlan->end_date = $request->input("endDate");
		}

		$userSubscriptionPlan->status = $request->input("status", $userSubscriptionPlan->status);
		$userSubscriptionPlan->type = $request->input("type", $userSubscriptionPlan->type);
		$saved = $userSubscriptionPlan->save();

		return [
			$saved,
			$saved ? "User Subscription Plan Updated Successfully." : "Failed to Update User Subscription Plan.",
			$userSubscriptionPlan,
		];
	}

	public function destroy($id)
	{
		$userSubscriptionPlan = UserSubscriptionPlan::findOrFail($id);
		$deleted = $userSubscriptionPlan->delete();

		return [
			$deleted,
			$deleted ? "User Subscription Plan Deleted Successfully." : "Failed to Delete User Subscription Plan.",
			$userSubscriptionPlan,
		];
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
