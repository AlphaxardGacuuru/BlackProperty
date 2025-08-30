<?php

namespace App\Http\Controllers;

use App\Events\ReferralCreatedEvent;
use App\Models\Referral;
use Illuminate\Http\Request;
use App\Http\Services\ReferralService;

class ReferralController extends Controller
{
	public function __construct(protected ReferralService $service) {}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$referrals = $this->service->index($request);

		return response([
			"status" => true,
			"message" => "Referrals fetched successfully",
			"data" => $referrals,
		], 200);
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
			"referer" => "required|email",
		]);

		[$saved, $message, $referral] = $this->service->store($request);

		ReferralCreatedEvent::dispatchIf($saved, $referral);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $referral,
		], 200);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Referral  $referral
	 * @return \Illuminate\Http\Response
	 */
	public function show(Referral $referral)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Models\Referral  $referral
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Referral $referral)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \App\Http\Requests\UpdateReferralRequest  $request
	 * @param  \App\Models\Referral  $referral
	 * @return \Illuminate\Http\Response
	 */
	public function update(UpdateReferralRequest $request, Referral $referral)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Referral  $referral
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Referral $referral)
	{
		//
	}
}
