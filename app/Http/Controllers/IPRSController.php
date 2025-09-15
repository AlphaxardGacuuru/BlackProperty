<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIPRSRequest;
use App\Http\Requests\UpdateIPRSRequest;
use App\Http\Services\IPRSService;
use App\Models\IPRS;

class IPRSController extends Controller
{
	public function __construct(protected IPRSService $service)
	{
		// 
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
     * @param  \App\Http\Requests\StoreIPRSRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreIPRSRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IPRS  $iPRS
     * @return \Illuminate\Http\Response
     */
    public function show(IPRS $iPRS)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IPRS  $iPRS
     * @return \Illuminate\Http\Response
     */
    public function edit(IPRS $iPRS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateIPRSRequest  $request
     * @param  \App\Models\IPRS  $iPRS
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateIPRSRequest $request, IPRS $iPRS)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IPRS  $iPRS
     * @return \Illuminate\Http\Response
     */
    public function destroy(IPRS $iPRS)
    {
        //
    }
}
