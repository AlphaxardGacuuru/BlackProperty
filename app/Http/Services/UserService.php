<?php

namespace App\Http\Services;

use App\Http\Resources\UserResource;
use App\Models\CardTransaction;
use App\Models\MPESATransaction;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserService extends Service
{
	/*
     * Get All Users
     */
	public function index($request)
	{
		if ($request->filled("idAndName")) {
			$userQuery = User::select("id", "name");

			$users = $userQuery
				->orderBy("id", "DESC")
				->get();

			return $users;
		}

		$query = new User;

		$query = $this->search($query, $request);

		$users = $query
			->orderby("id", "DESC")
			->paginate();

		return $users;
	}

	/**
	 * Display the specified resource.
	 *
	 */
	public function show($id)
	{
		return User::findOrFail($id);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 */
	public function update($request, $id)
	{
		/* Update profile */
		$user = User::findOrFail($id);

		$user->name = $request->input('name', $user->name);
		$user->phone = $request->input('phone', $user->phone);

		if ($request->filled('password')) {
			$user->password = Hash::make($request->input('password'));
		}

		$user->settings = $request->input('settings', $user->settings);

		if ($request->filled("userRoles")) {
			$user->syncRoles($request->userRoles);
		}

		$saved = $user->save();

		return [$saved, "Account Updated", $user];
	}

	/*
     * Soft Delete Service
     */
	public function destory($id)
	{
		$user = User::findOrFail($id);

		$deleted = $user->delete();

		return [$deleted, $user->name . " deleted"];
	}

	/*
     * Force Delete Service
     */
	public function forceDestory($id)
	{
		$user = User::findOrFail($id);

		// Get old thumbnail and delete it
		$oldThumbnail = substr($user->thumbnail, 9);

		Storage::disk("public")->delete($oldThumbnail);

		$deleted = $user->delete();

		return [$deleted, $user->name . " deleted"];
	}

	/**
	 * Get Auth.
	 *
	 */
	public function auth()
	{
		if (auth("sanctum")->check()) {

			$auth = auth('sanctum')->user();

			return new UserResource($auth);
		} else {
			return response(["message" => "Not Authenticated"], 401);
		}
	}

	/*
     * Search
     */
	public function search($query, $request)
	{
		$roleId = $request->roleId;

		if ($request->filled("roleId")) {
			$roleName = Role::find($roleId)->name;

			$query = $query->role($roleName);
		}

		$name = $request->input("name");

		if ($request->filled("name")) {
			$query = $query->where("name", "LIKE", "%" . $name . "%");
		}

		return $query;
	}
}
