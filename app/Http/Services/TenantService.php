<?php

namespace App\Http\Services;

use App\Http\Resources\TenantResource;
use App\Http\Services\Service;
use App\Models\Unit;
use App\Models\User;
use App\Models\UserUnit;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TenantService extends Service
{
	/*
     * Get All Tenants
     */
	public function index($request)
	{
		if ($request->filled("idAndName")) {
			$tenantQuery = new UserUnit;

			$tenantQuery = $this->search($tenantQuery, $request);

			$tenants = $tenantQuery->whereNull("vacated_at")
				->get()
				->map(fn($userUnit) => [
					"id" => $userUnit->user->id,
					"userUnitId" => $userUnit->id,
					"unitId" => $userUnit->unit_id,
					"unitName" => $userUnit->unit->name,
					"propertyId" => $userUnit->unit->property->id,
					"name" => $userUnit->user->name,
				]);

			return response([
				"data" => $tenants,
			], 200);
		}

		$tenantQuery = new UserUnit;

		$tenantQuery = $this->search($tenantQuery, $request);

		$tenants = $tenantQuery->orderBy("id", "DESC")
			->paginate(20)
			->appends([
				"propertyId" => $request->propertyId,
				"unitId" => $request->unitId,
			]);

		return TenantResource::collection($tenants);
	}

	/*
     * Get One Tenant
     */
	public function show($id)
	{
		$tenant = UserUnit::where("user_id", $id)
			->firstOrFail();

		return new TenantResource($tenant);
	}

	/*
     * Store
     */
	public function store($request)
	{
		$tenantQuery = User::where("email", $request->email);

		// Check if User exists
		$doesntExist = $tenantQuery->doesntExist();

		if ($doesntExist) {
			$tenant = new User;
			$tenant->name = $request->input("name");
			$tenant->email = $request->input("email");
			$tenant->phone = $request->input("phone");
			$tenant->gender = $request->input("gender");
			$tenant->password = Hash::make($request->input("email"));
		} else {
			$tenant = $tenantQuery->first();

			// Check if user is occupying elsewhere
			$alreadyATenantElsewhere = UserUnit::where("user_id", $tenant->id)
				->whereNull("vacated_at")
				->exists();

			if ($alreadyATenantElsewhere) {
				return [false, $tenant->name . " already a tenant elsewhere", "", 422];
			}
		}

		// Check if Unit already occupied
		$unitAlreadyOccupied = UserUnit::where("unit_id", $request->unitId)
			->whereNull("vacated_at")
			->exists();

		if ($unitAlreadyOccupied) {
			return [false, "Unit already occupied", "", 422];
		}

		$saved = DB::transaction(function () use ($tenant, $request) {
			$saved = $tenant->save();

			// Add UserUnit
			if ($request->filled("unitId")) {
				$userUnit = new UserUnit;
				$userUnit->user_id = $tenant->id;
				$userUnit->unit_id = $request->input("unitId");
				$userUnit->occupied_at = $request->input("occupiedAt");
				$userUnit->created_by = $this->id;
				$userUnit->save();

				// Set Unit as occupied
				$unit = $userUnit->unit;
				$unit->status = "occupied";
				$unit->save();
			}

			return $saved;
		});

		$message = $tenant->name . " added successfully";

		return [$saved, $message, $tenant, 200];
	}

	/*
     * Update Tenant
     */
	public function update($request, $id)
	{
		$tenant = User::findOrFail($id);

		if ($request->filled("name")) {
			$tenant->name = $request->input("name");
		}

		if ($request->filled("email")) {
			$tenant->email = $request->input("email");
		}

		if ($request->filled("phone")) {
			$tenant->phone = $request->input("phone");
		}

		if ($request->filled("gender")) {
			$tenant->gender = $request->input("gender");
		}

		if ($request->filled("password")) {
			$tenant->password = Hash::make($request->input("email"));
		}

		if ($request->filled("occupiedAt")) {
			$tenant->occupied_at = Hash::make($request->input("occupiedAt"));
		}

		// Mark User Unit as vacated
		if ($request->filled("vacate")) {
			DB::transaction(function () use ($request, $id) {
				$userUnit = UserUnit::where("user_id", $id)
					->where("unit_id", $request->input("unitId"))
					->first();

				$userUnit->vacated_at = Carbon::now();
				$userUnit->save();

				// Set Unit as vacant
				$unit = $userUnit->unit;
				$unit->status = "vacant";
				$unit->save();
			});
		}

		$saved = $tenant->save();

		$message = $tenant->name . " Updated Successfully";

		return [$saved, $message, $tenant];
	}

	/*
     * Delete Service
     */
	public function destroy($request, $id)
	{
		$tenant = User::findOrFail($id);

		// Mark User Unit as vacated
		$deleted = DB::transaction(function () use ($tenant, $request, $id) {

			if ($request->filled("unitId")) {
				$userUnit = UserUnit::where("user_id", $id)
					->where("unit_id", $request->input("unitId"))
					->first();
				$userUnit->vacated_at = Carbon::now();
				$userUnit->save();

				// Set Unit as vacant
				$unit = $userUnit->unit;
				$unit->status = "vacant";
				$unit->save();
			}

			return $tenant->delete();
		});

		return [$deleted, $tenant->name . " Deleted Successfully", $tenant];
	}

	/*
     * Handle Search
     */
	public function search($query, $request)
	{
		$propertyId = explode(",", $request->propertyId);

		if ($request->filled("propertyId")) {
			$query = $query->whereHas("unit.property", function ($query) use ($propertyId) {
				$query->whereIn("id", $propertyId);
			});
		}

		$unitId = $request->input("unitId");

		if ($request->filled("unitId")) {
			$query = $query->where("unit_id", $unitId);
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
