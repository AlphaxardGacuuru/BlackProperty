<?php

namespace App\Http\Controllers;

use App\Http\Services\KopokopoTransferService;
use App\Models\KopokopoTransfer;
use Illuminate\Http\Request;

class KopokopoTransferController extends Controller
{
    public function __construct(protected KopokopoTransferService $service)
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
        return $this->service->index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        [$saved, $message, $kopokopoTransfer] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $kopokopoTransfer,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KopokopoTransfer  $kopokopoTransfer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
		// 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\KopokopoTransfer  $kopokopoTransfer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KopokopoTransfer $kopokopoTransfer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KopokopoTransfer  $kopokopoTransfer
     * @return \Illuminate\Http\Response
     */
    public function destroy(KopokopoTransfer $kopokopoTransfer)
    {
        //
    }

    /*
     * Initiate Transfer
     */
    public function initiateTransfer(Request $request)
    {
        $this->validate($request, [
            "type" => "string|required",
            "destinationReference" => "string|required",
            "amount" => "string|required",
        ]);

        [$status, $message, $data] = $this->service->initiateTransfer($request);

        return response([
            "status" => $status,
            "message" => $message,
            "data" => $data,
        ], 200);
    }
}
