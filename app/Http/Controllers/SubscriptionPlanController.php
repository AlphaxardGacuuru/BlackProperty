<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubscriptionPlanResource;
use App\Http\Services\SubscriptionPlanService;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{
	public function __construct(protected SubscriptionPlanService $service)
	{
		// Constructor injection of the SubscriptionPlanService
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$subscriptionPlans = $this->service->index();

		return SubscriptionPlanResource::collection($subscriptionPlans)
			->additional([
				'status' => true,
				'message' => $subscriptionPlans->count() . ' Subscription plans retrieved successfully.',
			]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\SubscriptionPlan  $subscriptionPlan
	 * @return \Illuminate\Http\Response
	 */
	public function show(SubscriptionPlan $subscriptionPlan)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\SubscriptionPlan  $subscriptionPlan
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, SubscriptionPlan $subscriptionPlan)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\SubscriptionPlan  $subscriptionPlan
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(SubscriptionPlan $subscriptionPlan)
	{
		//
	}

	public function subscribe(Request $request)
	{
		$this->validate($request, [
			'subscriptionPlanId' => 'required|exists:subscription_plans,id',
			'amountPaid' => 'required|numeric|min:0',
			'duration' => 'required|integer|min:1',
		]);

		[$saved, $message, $userSubscriptionPlan] = $this->service->subscribe($request);

		return response()->json([
			'success' => $saved,
			'message' => $message,
			'user_subscription_plan' => $userSubscriptionPlan,
		], 200);
	}
}
