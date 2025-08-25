<?php

namespace App\Http\Services;

use App\Models\Referral;
use App\Models\User;

class ReferralService extends Service
{
	public function store($request)
	{
		$refererId = User::where("email", $request->referer)->first()->id;

		$referral = new Referral;
		$referral->referer_id = $refererId;
		$referral->referee_id = $this->id;
		$saved = $referral->save();

		return [$saved, "Referral Saved Successfully", $referral];
	}
}