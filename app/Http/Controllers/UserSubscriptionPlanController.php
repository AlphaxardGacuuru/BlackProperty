<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserSubscriptionPlanResource;
use App\Http\Services\UserSubscriptionPlanService;
use Illuminate\Http\Request;

class UserSubscriptionPlanController extends Controller
{
	public function __construct(protected UserSubscriptionPlanService $service)
	{
		// 
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$userSubscriptionPlans = $this->service->index($request);

		return UserSubscriptionPlanResource::collection($userSubscriptionPlans)
			->additional([
				'status' => true,
				'message' => $userSubscriptionPlans->count() . ' User Subscription plans retrieved successfully.',
			]);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$this->validate($request, [
			'subscriptionPlanId' => 'required|exists:subscription_plans,id',
			'amountPaid' => 'nullable|numeric|min:0',
			'duration' => 'required|integer|min:1',
		]);

		[$saved, $message, $userSubscriptionPlan] = $this->service->store($request);

		return response()->json([
			'success' => $saved,
			'message' => $message,
			'user_subscription_plan' => $userSubscriptionPlan,
		], 200);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}
}
