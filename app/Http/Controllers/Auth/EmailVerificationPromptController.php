<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function __invoke(Request $request)
    {
		return redirect(config("app.url") . "/#/verify-email/{$request->id}/{$request->hash}?expires={$request->expires}&signature={$request->signature}");

        // return $request->user()->hasVerifiedEmail()
        //             ? redirect()->intended(RouteServiceProvider::HOME)
        //             : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
