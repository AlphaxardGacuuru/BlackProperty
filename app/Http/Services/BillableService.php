<?php

namespace App\Http\Services;

use App\Http\Resources\BillableResource;
use App\Models\Billable;

class BillableService extends Service
{
	/*
	* Get Admission Billable by Course ID
	*/ 
	public function admissionById($id)
	{
		$admissionBillable = Billable::where("course_id", $id)->first();

		return new BillableResource($admissionBillable);
	}
}