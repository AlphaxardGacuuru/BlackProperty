<?php

namespace App\Http\Controllers;

use App\Http\Services\StatementService;
use Illuminate\Http\Request;

class StatementController extends Controller
{
	public function __construct(protected StatementService $service)
	{
		// 
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show(Request $request, $type)
	{
		return $this->service->show($request, $type);
	}
}
