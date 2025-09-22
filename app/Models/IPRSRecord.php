<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IPRSRecord extends Model
{
    use HasFactory;

	protected $table = 'iprs_records';

	protected $casts = [
		'date_of_birth' => 'datetime',
		'id_issue_date' => 'datetime',
		'id_expiry_date' => 'datetime',
		'parent_details' => 'object',
		'biometric_data' => 'object',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
	];
}
