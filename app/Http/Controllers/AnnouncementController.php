<?php

namespace App\Http\Controllers;

use App\Events\AnnouncementCreatedEvent;
use App\Http\Resources\AnnouncementResource;
use App\Http\Services\AnnouncementService;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
	public function __construct(protected AnnouncementService $service)
	{
		//
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$announcements = $this->service->index($request);

		return AnnouncementResource::collection($announcements);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$this->validate($request, [
			"message" => "required|string",
			"channels" => "required|array",
			"channels.*" => "in:email,sms",
			"userUnitIds" => "required|array",
		]);

		[$saved, $message, $announcement] = $this->service->store($request);

		AnnouncementCreatedEvent::dispatchIf($saved, $announcement);

		return response()->json([
			"saved" => $saved,
			"message" => $message,
			"announcement" => $announcement,
		], 200);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Announcement  $announcement
	 * @return \Illuminate\Http\Response
	 */
	public function show(Announcement $announcement)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Models\Announcement  $announcement
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Announcement $announcement)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Announcement  $announcement
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Announcement $announcement)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Announcement  $announcement
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Announcement $announcement)
	{
		//
	}
}
