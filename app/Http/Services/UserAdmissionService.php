<?php

namespace App\Http\Services;

use App\Models\UserAdmission;

class UserAdmissionService extends Service
{
	public function index($request)
	{
		$userAdmissionQuery = new UserAdmission;

		$userAdmissionQuery = $this->search($userAdmissionQuery, $request);

		$userAdmissions = $userAdmissionQuery
			->orderby("id", "DESC")
			->paginate();

		return $userAdmissions;
	}

	public function show($id)
	{
		$userAdmission = UserAdmission::findOrFail($id);

		return $userAdmission;
	}

	public function store($request)
	{
		$userAdmission = new UserAdmission;
		$userAdmission->iprs_record_id = $request->iprsRecordId;
		$userAdmission->user_unit_id = $request->tenantId;
		$userAdmission->first_name = $request->firstName;
		$userAdmission->middle_name = $request->middleName;
		$userAdmission->last_name = $request->lastName;
		$userAdmission->national_id = $request->nationalID;
		$userAdmission->email = $request->email;
		$userAdmission->phone = $request->phone;
		$userAdmission->status = "pending";
		$userAdmission->created_by = $this->id;

		$saved = $userAdmission->save();

		return [$saved, "User Admission Request Sent Successfully", $userAdmission];
	}

	public function update($request, $id)
	{
		$userAdmission = UserAdmission::find($id);
		$userAdmission->user_unit_id = $request->input("userUnitId", $userAdmission->user_unit_id);
		$userAdmission->first_name = $request->input("firstName", $userAdmission->first_name);
		$userAdmission->middle_name = $request->input("middleName", $userAdmission->middle_name);
		$userAdmission->last_name = $request->input("lastName", $userAdmission->last_name);
		$userAdmission->national_id = $request->input("nationalID", $userAdmission->national_id);
		$userAdmission->email = $request->input("email", $userAdmission->email);
		$userAdmission->phone = $request->input("phone", $userAdmission->phone);
		$userAdmission->status = "pending";
		$userAdmission->created_by = $this->id;

		$saved = $userAdmission->save();

		return [$saved, "User Admission Request Sent Successfully", $userAdmission];
	}

	public function destroy($id)
	{
		$userAdmission = UserAdmission::findOrFail($id);

		$deleted = $userAdmission->delete();

		return [$deleted, "User Admission Request Deleted Successfully", $userAdmission];
	}

	/*
     * Handle Search
     */
	public function search($query, $request)
	{
		if ($request->filled("propertyId")) {
			$propertyId = explode(",", $request->propertyId);

			$query = $query->whereHas("unit.property", function ($query) use ($propertyId) {
				$query->whereIn("id", $propertyId);
			});
		}

		$unitId = $request->input("unitId");

		if ($request->filled("unitId")) {
			$query = $query->where("unit_id", $unitId);
		}

		$userUnitId = $request->input("userUnitId");

		if ($request->filled("userUnitId")) {
			$query = $query->where("id", $userUnitId);
		}

		$name = $request->input("name");

		if ($request->filled("name")) {
			$query = $query
				->whereHas("user", function ($query) use ($name) {
					$query->where("name", "LIKE", "%" . $name . "%");
				});
		}

		$phone = $request->input("phone");

		if ($request->filled("phone")) {
			$query = $query
				->whereHas("user", function ($query) use ($phone) {
					$query->where("phone", "LIKE", "%" . $phone . "%");
				});
		}

		$gender = $request->input("gender");

		if ($request->filled("gender")) {
			$query = $query
				->whereHas("user", function ($query) use ($gender) {
					$query->where("gender", "LIKE", "%" . $gender . "%");
				});
		}

		if ($request->filled("vacated")) {
			$query = $query->whereNotNull("vacated_at");
		}

		if ($request->filled("occupied")) {
			$query = $query->whereNull("vacated_at");
		}

		return $query;
	}
}
