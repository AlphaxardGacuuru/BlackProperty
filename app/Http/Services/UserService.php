<?php

namespace App\Http\Services;

use App\Http\Resources\UserResource;
use App\Models\CardTransaction;
use App\Models\MPESATransaction;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class UserService extends Service
{
    /*
     * Get All Users
     */
    public function index()
    {
        $getUsers = User::orderby("id", "DESC")->paginate();

        return UserResource::collection($getUsers);
    }

    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update($request, $id)
    {
        /* Update profile */
        $user = User::findOrFail($id);

        if ($request->filled('name')) {
            $user->name = $request->input('name');
        }

        if ($request->filled('phone')) {
            $user->phone = $request->input('phone');
            $user->password = Hash::make($request->input('phone'));
        }

        $saved = $user->save();

        return [$saved, "Account updated", $user];
    }

    /*
     * Soft Delete Service
     */
    public function destory($id)
    {
        $user = User::findOrFail($id);

        $deleted = $user->delete();

        return [$deleted, $user->name . " deleted"];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $user = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($user->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $user->delete();

        return [$deleted, $user->name . " deleted"];
    }

    /**
     * Get Auth.
     *
     */
    public function auth()
    {
        if (auth("sanctum")->check()) {

            $auth = auth('sanctum')->user();

            return new UserResource($auth);
        } else {
            return response(["message" => "Not Authenticated"], 401);
        }
    }

    /*
     * Fee Statements
     */
    public function feeStatements($id)
    {
        // Retrieve the user by ID with its associated courses
        $userCourses = User::with('courses')
            ->find($id)
            ->courses()
            ->select("courses.id", "courses.name", "price as debit", "user_courses.created_at")
            ->get();

        $cardPaymentQuery = CardTransaction::select("id", "amount as credit", "created_at")
            ->where("user_id", $id);

        $mpesaPaymentQuery = MPESATransaction::select("id", "amount as credit", "created_at")
            ->where("user_id", $id);

        // Calculate total fees paid
        $feesPaid = $cardPaymentQuery->sum("amount") + $mpesaPaymentQuery->sum("amount");

        $cardPayments = $cardPaymentQuery->get();

        $mpesaPayments = $mpesaPaymentQuery->get();

        $balance = 0;

        $feeStatements = $userCourses
            ->concat($cardPayments)
            ->concat($mpesaPayments)
            ->sortBy(fn($item) => Carbon::parse($item->created_at))
            ->values()
            ->map(function ($item) use (&$balance) {

                // Calculate balance
                if ($item->credit) {
                    $balance -= $item->credit;
                } else {
                    $balance += $item->debit;
                }

                $item->balance = number_format($balance);
                $item->type = $item->credit ? "Fees Paid" : $item->name;
                $item->credit = number_format($item->credit);
                $item->debit = number_format($item->debit);

                return $item;
            })
            ->reverse()
            ->values();

        return [
            "data" => [
                "statement" => $feeStatements,
                "paid" => $feesPaid,
            ],
        ];
    }
}
