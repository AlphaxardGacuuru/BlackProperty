<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SMS extends Model
{
    use HasFactory;

	protected $table = "smses";

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

	public function userUnit()
	{
		return $this->belongsTo(UserUnit::class);
	}
}
