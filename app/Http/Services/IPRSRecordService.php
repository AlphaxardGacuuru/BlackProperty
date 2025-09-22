<?php

namespace App\Http\Services;

use App\Models\IPRSRecord;

class IPRSRecordService extends Service
{
	public function show($nationalID)
	{
		return IPRSRecord::where("national_id", $nationalID)->first();
	}
}