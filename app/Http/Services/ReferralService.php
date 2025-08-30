<?php

namespace App\Http\Services;

use App\Http\Resources\ReferralResource;
use App\Models\Referral;
use App\Models\User;

class ReferralService extends Service
{
	public function index($request)
	{
		$query = new Referral;

		$query = $this->search($query, $request);

		$invoices = $query
			->orderBy("month", "DESC")
			->orderBy("year", "DESC")
			->orderBy("id", "DESC")
			->paginate(20)
			->appends($request->all());

		return ReferralResource::collection($invoices);
	}
	
	public function store($request)
	{
		$refererId = User::where("email", $request->referer)->first()->id;

		$referral = new Referral;
		$referral->referer_id = $refererId;
		$referral->referee_id = $this->id;
		$saved = $referral->save();

		return [$saved, "Referral Saved Successfully", $referral];
	}

	/*
     * Handle Search
     */
	public function search($query, $request)
	{
		if ($request->filled("name")) {
			$query = $query->where("name", "LIKE", "%" . $request->name . "%");
		}
		
		if ($request->filled("email")) {
			$query = $query->where("email", "LIKE", "%" . $request->email . "%");
		}

		if ($request->filled("refererId")) {
			$query = $query->where("referer_id", $request->refererId);
		}

		if ($request->filled("refereeId")) {
			$query = $query->where("referee_id", $request->refereeId);
		}

		$startMonth = $request->input("startMonth");
		$endMonth = $request->input("endMonth");
		$startYear = $request->input("startYear");
		$endYear = $request->input("endYear");

		if ($request->filled("startMonth")) {
			$query = $query->where("month", ">=", $startMonth);
		}

		if ($request->filled("endMonth")) {
			$query = $query->where("month", "<=", $endMonth);
		}

		if ($request->filled("startYear")) {
			$query = $query->where("year", ">=", $startYear);
		}

		if ($request->filled("endYear")) {
			$query = $query->where("year", "<=", $endYear);
		}

		return $query;
	}
}