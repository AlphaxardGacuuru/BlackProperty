<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referral extends Model
{
    use HasFactory;

	/*
	* Relationships
	*/ 

	public function referer()
	{
		return $this->belongsTo(User::class, "referer_id");
	}

	public function referee()
	{
		return $this->belongsTo(User::class, "referee_id");
	}
}
