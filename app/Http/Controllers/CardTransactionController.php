<?php

namespace App\Http\Controllers;

use App\Http\Services\CardTransactionService;
use App\Models\CardTransaction;
use Illuminate\Http\Request;

class CardTransactionController extends Controller
{
    public function __construct(protected CardTransactionService $service)
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
        [$saved, $message, $cardTransaction] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $cardTransaction,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CardTransaction  $cardTransaction
     * @return \Illuminate\Http\Response
     */
    public function show(CardTransaction $cardTransaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CardTransaction  $cardTransaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CardTransaction $cardTransaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CardTransaction  $cardTransaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(CardTransaction $cardTransaction)
    {
        //
    }
}
