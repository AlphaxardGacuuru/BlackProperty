<?php

namespace App\Http\Services;

use App\Http\Resources\StaffResource;
use App\Http\Services\Service;
use App\Models\User;
use App\Models\UserProperty;
use App\Models\UserRole;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StaffService extends Service
{
	/*
     * Get All Staff
     */
	public function index($request)
	{
		$staffQuery = new UserProperty;

		$staffQuery = $this->search($staffQuery, $request);

		$staff = $staffQuery
			->orderBy("id", "DESC")
			->paginate(20)
			->appends([
				"propertyId" => $request->propertyId,
			]);

		return StaffResource::collection($staff);
	}

	/*
     * Get One Staff
     */
	public function show($id)
	{
		$staff = UserProperty::where("user_id", $id)
			->firstOrFail();

		return new StaffResource($staff);
	}

	/*
     * Store
     */
	public function store($request)
	{
		$staffQuery = User::where("email", $request->email);

		// Check if User exists
		$doesntExist = $staffQuery->doesntExist();

		if ($doesntExist) {
			$staff = new User;
			$staff->name = $request->input("name");
			$staff->email = $request->input("email");
			$staff->phone = $request->input("phone");
			$staff->gender = $request->input("gender");
			$staff->password = Hash::make($request->input("email"));
		} else {
			$staff = $staffQuery->first();

			// Check if staff Already Exists
			$staffExists = UserProperty::where("user_id", $staff->id)
				->where("property_id", $request->propertyId)
				->exists();

			if ($staffExists) {
				return [false, "Staff Already Exists", "", 422];
			}
		}

		$saved = DB::transaction(function () use ($request, $staff) {
			$saved = $staff->save();

			$userProperty = new UserProperty;
			$userProperty->user_id = $staff->id;
			$userProperty->property_id = $request->propertyId;
			$userProperty->save();

			foreach ($request->userRoles as $roleId) {
				$userRole = new UserRole();
				$userRole->user_id = $staff->id;
				$userRole->role_id = $roleId;
				$userRole->save();
			}

			return $saved;
		});

		$message = $staff->name . " added successfully";

		return [$saved, $message, $staff, 200];
	}

	/*
     * Update Staff
     */
	public function update($request, $id)
	{
		$staff = User::findOrFail($id);

		if ($request->filled("name")) {
			$staff->name = $request->input("name");
		}

		if ($request->filled("email")) {
			$staff->email = $request->input("email");
		}

		if ($request->filled("phone")) {
			$staff->phone = $request->input("phone");
		}

		if ($request->filled("gender")) {
			$staff->gender = $request->input("gender");
		}

		if ($request->filled("password")) {
			$staff->password = Hash::make($request->input("email"));
		}

		if ($request->filled("propertyId")) {
			DB::transaction(function () use ($staff, $request) {
				// Remove propertys not included
				UserProperty::where("user_id", $staff->id)
					->delete();

				$userRole = new UserProperty;
				$userRole->user_id = $staff->id;
				$userRole->property_id = $request->propertyId;
				$userRole->save();
			});
		}

		if ($request->filled("userRoles")) {
			if (count($request->input("userRoles")) > 0) {
				foreach ($request->input("userRoles") as $roleId) {
					// Check if role Already Exists
					$userRoleDoesntExist = UserRole::where("user_id", $staff->id)
						->where("role_id", $roleId)
						->doesntExist();

					if ($userRoleDoesntExist) {
						$userRole = new UserRole();
						$userRole->user_id = $staff->id;
						$userRole->role_id = $roleId;
						$userRole->save();
					} else {
						// Remove roles not included
						UserRole::where("user_id", $staff->id)
							->whereNotIn("role_id", $request->userRoles)
							->delete();
					}
				}
			} else {
				// Remove roles not included
				UserRole::where("user_id", $staff->id)
					->delete();
			}
		}

		$saved = $staff->save();

		$message = $staff->name . " Updated Successfully";

		return [$saved, $message, $staff];
	}

	/*
     * Soft Delete Service
     */
	public function destroy($request, $id)
	{
		$staff = UserProperty::where("user_id", $id)
			->where("property_id", $request->input("propertyId"))
			->firstOrFail();

		$deleted = $staff->delete();

		return [$deleted, $staff->user->name . " Deleted Successfully", $staff];
	}

	/*
     * Search
     */
	public function search($query, $request)
	{
		$propertyId = explode(",", $request->propertyId);

		$query = $query->whereIn("property_id", $propertyId);

		$roleId = $request->roleId;

		if ($request->filled("roleId")) {
			$query = $query->whereHas("user.userRoles", function ($query) use ($roleId) {
				$query->where("role_id", $roleId);
			});
		}

		if ($request->filled("userId")) {
			$query = $query->where("user_id", $request->userId);
		}

		$name = $request->input("name");

		if ($request->filled("name")) {
			$query = $query
				->whereHas("user", function ($query) use ($name) {
					$query->where("name", "LIKE", "%" . $name . "%");
				});
		}

		return $query;
	}
}
