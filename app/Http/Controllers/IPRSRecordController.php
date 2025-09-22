<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIPRSRecordRequest;
use App\Http\Requests\UpdateIPRSRecordRequest;
use App\Http\Services\IPRSRecordService;
use App\Models\IPRSRecord;

class IPRSRecordController extends Controller
{
	public function __construct(protected IPRSRecordService $service)
	{
		
	}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreIPRSRecordRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreIPRSRecordRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IPRSRecord  $iPRSRecord
     * @return \Illuminate\Http\Response
     */
    public function show($nationID)
    {
		$iprsRecord = $this->service->show($nationID);

		return response()->json([
			"status" => 200,
			"message" => $iprsRecord ? "IPRS Record Retrieved Successfully" : "IPRS Record Not Found",
			"data" => $iprsRecord,
		], $iprsRecord ? 200 : 404);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IPRSRecord  $iPRSRecord
     * @return \Illuminate\Http\Response
     */
    public function edit(IPRSRecord $iPRSRecord)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateIPRSRecordRequest  $request
     * @param  \App\Models\IPRSRecord  $iPRSRecord
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateIPRSRecordRequest $request, IPRSRecord $iPRSRecord)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IPRSRecord  $iPRSRecord
     * @return \Illuminate\Http\Response
     */
    public function destroy(IPRSRecord $iPRSRecord)
    {
        //
    }
}
