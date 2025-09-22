<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAdmission extends Model
{
	use HasFactory;

	public function updatedAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => Carbon::parse($value)->format('d M Y'),
		);
	}

	public function createdAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => Carbon::parse($value)->format('d M Y'),
		);
	}

	/*
	* Relationships
	*/

	public function userUnit()
	{
		return $this->belongsTo(UserUnit::class, 'user_unit_id');
	}

	public function iprsRecord()
	{
		return $this->belongsTo(IPRSRecord::class, 'iprs_record_id');
	}

	public function createdBy()
	{
		return $this->belongsTo(User::class, 'created_by');
	}
}
