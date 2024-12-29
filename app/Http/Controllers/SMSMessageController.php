<?php

namespace App\Http\Controllers;

use App\Http\Services\SMSMessageService;
use App\Models\SMSMessage;
use Illuminate\Http\Request;

class SMSMessageController extends Controller
{
	public function __construct(protected SMSMessageService $service)
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
		return $this->service->index($request);
	}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SMSMessage  $sMSMessage
     * @return \Illuminate\Http\Response
     */
    public function show(SMSMessage $sMSMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SMSMessage  $sMSMessage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SMSMessage $sMSMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SMSMessage  $sMSMessage
     * @return \Illuminate\Http\Response
     */
    public function destroy(SMSMessage $sMSMessage)
    {
        //
    }
}
