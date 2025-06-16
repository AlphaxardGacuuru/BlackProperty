<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Notifications\WelcomeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class AuthenticatedSessionController extends Controller
{
	/**
	 * Display the login view.
	 *
	 * @return \Inertia\Response
	 */
	public function create()
	{
		return Inertia::render('Auth/Login', [
			'canResetPassword' => Route::has('password.request'),
			'status' => session('status'),
		]);
	}

	/*
     * Social Logins*/
	public function redirectToProvider($website)
	{
		return Socialite::driver($website)->redirect();
	}

	/**
	 * Obtain the user information from GitHub/Google/Twitter/Facebook.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function handleProviderCallback($website)
	{
		$user = Socialite::driver($website)->user();

		$name = $user->getName() ? $user->getName() : " ";

		$email = $user->getEmail() ? $user->getEmail() : redirect('/');

		$avatar = $user->getAvatar() ? $user->getAvatar() : "avatar/male-avatar.png";

		$dbUserQuery = User::where("email", $email);

		if ($dbUserQuery->doesntExist()) {
			// If user does not exist, create a new user
			$dbUser = new User;
			$dbUser->name = $name;
			$dbUser->email = $email;
			$dbUser->avatar = $avatar;
			$dbUser->password = Hash::make($email);
			$saved = $dbUser->save();

			$dbUser->notify(WelcomeNotification::class);
		} else {
			// If user exists, update the existing user
			$dbUser = $dbUserQuery->first();
			$dbUser->name = $name;
			$dbUser->avatar = $avatar;
			$dbUser->save();
		}

		// Check if user exists
		$token = $dbUser
			->first()
			->createToken("deviceName")
			->plainTextToken;

		return redirect("/#/socialite/Logged in/" . $token);
	}

	/**
	 * Handle an incoming authentication request.
	 */
	public function store(LoginRequest $request)
	{
		$request->validate([
			'email' => 'required',
			'password' => 'required',
			'device_name' => 'required',
		]);

		$user = User::where('email', $request->email)->first();

		if (!$user) {
			throw ValidationException::withMessages([
				'email' => ['The provided email is incorrect.'],
			]);
		}

		if (!Hash::check($request->password, $user->password)) {
			throw ValidationException::withMessages([
				'password' => ['The provided password is incorrect.'],
			]);
		}

		$token = $user
			->createToken($request->device_name)
			->plainTextToken;

		return response([
			"message" => "Logged in",
			"data" => $token,
		], 200);
	}

	/**
	 * Destroy an authenticated session.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Request $request)
	{
		// Delete Current Access Token
		$hasLoggedOut = auth("sanctum")
			->user()
			->currentAccessToken()
			->delete();

		if ($hasLoggedOut) {
			$message = "Logged Out";
		} else {
			$message = "Failed to log out";
		}

		return response(["message" => $message], 200);
	}
}
