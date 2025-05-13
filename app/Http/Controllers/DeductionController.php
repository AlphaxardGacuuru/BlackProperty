<?php

namespace App\Http\Controllers;

use App\Http\Services\DeductionService;
use Illuminate\Http\Request;

class DeductionController extends Controller
{
    public function __construct(protected DeductionService $service)
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
        $this->validate($request, [
			"unitId" => "required|integer",
            "description" => "required|string",
            "amount" => "required|integer",
			"month" => "required|integer|min:1",
			"year" => "required|integer",
        ]);

        [$saved, $message, $deductions] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $deductions,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Deduction  $deduction
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Deduction  $deduction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "description" => "nullable|string",
            "amount" => "nullable|integer",
        ]);

        [$saved, $message, $deductions] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $deductions,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Deduction  $deduction
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $deduction] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $deduction,
        ], 200);
    }
}
