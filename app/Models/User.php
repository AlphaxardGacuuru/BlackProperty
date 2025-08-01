<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
	use HasApiTokens, HasFactory, Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'name',
		'email',
		'password',
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'password',
		'remember_token',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
		'updated_at' => 'datetime:d M Y',
		'created_at' => 'datetime:d M Y',
	];

	/**
	 * Accesors.
	 *
	 * @return \Illuminate\Database\Eloquent\Casts\Attribute
	 */
	protected function avatar(): Attribute
	{
		return Attribute::make(
			get: fn($value) => preg_match("/http/", $value) ? $value : "/storage/" . $value
		);
	}

	protected function emailVerifiedAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => $value ? Carbon::parse($value)->format('d M Y') : null,
		);
	}

	protected function updatedAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => Carbon::parse($value)->format('d M Y'),
		);
	}

	protected function createdAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => Carbon::parse($value)->format('d M Y'),
		);
	}

	/*
     * Relationships
     */

	public function userSubscriptionPlans()
	{
		return $this->hasMany(UserSubscriptionPlan::class);
	}

	public function properties()
	{
		return $this->hasMany(Property::class);
	}

	public function property()
	{
		return $this->belongsToMany(Property::class, "user_properties");
	}

	public function units()
	{
		return $this->belongsToMany(Unit::class, 'user_units');
	}

	public function roles()
	{
		return $this->belongsToMany(Role::class, 'user_roles');
	}

	public function userProperties()
	{
		return $this->hasMany(UserProperty::class);
	}

	public function userUnits()
	{
		return $this->hasMany(UserUnit::class);
	}

	public function userRoles()
	{
		return $this->hasMany(UserRole::class);
	}

	/*
     * Custom functions
     */

	public function activeSubscription()
	{
		$userSubscriptionPlan = $this->userSubscriptionPlans()
			->where('status', 'active')
			->first();

		if (!$userSubscriptionPlan) {
			return null;
		}

		$userSubscriptionPlan->name = $userSubscriptionPlan->subscriptionPlan->name;
		$userSubscriptionPlan->price = $userSubscriptionPlan->subscriptionPlan->price;
		$userSubscriptionPlan->max_units = $userSubscriptionPlan->subscriptionPlan->max_units;

		return $userSubscriptionPlan;
	}

	public function currentUnit()
	{
		return $this->userUnits()
			->whereNull("vacated_at")
			->orderBy("id", "DESC")
			->first()
			?->unit;
	}

	// Returns an array of permissions
	public function permissions()
	{
		$permissions = [];

		foreach ($this->userRoles as $userRole) {
			$roleEntities = $userRole->role->permissions;

			array_push($permissions, $roleEntities);
		}

		// Combine array and get unique
		return collect($permissions)
			->collapse()
			->unique();
	}
}
