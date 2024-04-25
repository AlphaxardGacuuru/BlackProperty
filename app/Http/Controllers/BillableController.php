<?php

namespace App\Http\Controllers;

use App\Http\Services\BillableService;
use App\Models\Billable;
use Illuminate\Http\Request;

class BillableController extends Controller
{
    public function __construct(protected BillableService $service)
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
     * @param  \App\Models\Billable  $billable
     * @return \Illuminate\Http\Response
     */
    public function show(Billable $billable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Billable  $billable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Billable $billable)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Billable  $billable
     * @return \Illuminate\Http\Response
     */
    public function destroy(Billable $billable)
    {
        //
    }

    /*
     * Get Admission Billable by Course ID
     */
    public function admissionById($id)
    {
        return $this->service->admissionById($id);
    }
}
