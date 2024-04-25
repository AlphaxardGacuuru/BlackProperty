<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\AdminService;

class AdminController extends Controller
{
    public function __construct(protected AdminService $service)
    {
        //
    }

    /*
     * Get Dashboard Data
     */
    public function index()
    {
        return $this->service->index();
    }
}
