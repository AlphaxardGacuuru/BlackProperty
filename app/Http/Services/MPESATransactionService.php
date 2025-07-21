<?php

namespace App\Http\Services;

use App\Http\Resources\MPESATransactionResource;
use App\Models\MPESATransaction;
use App\Models\User;
use App\Models\UserSubscriptionPlan;
use Kopokopo\SDK\K2;

class MPESATransactionService extends Service
{
	/*
     * Show All Card Transactions
     */
	public function index($request)
	{
		$mpesaTransactionQuery = new MPESATransaction;

		$mpesaTransactionQuery = $this->search($mpesaTransactionQuery, $request);

		$sum = $mpesaTransactionQuery->sum("amount");

		$creditNotes = $mpesaTransactionQuery
			->orderBy("id", "DESC")
			->paginate(20);

		return MPESATransactionResource::collection($creditNotes)
			->additional(["sum" => number_format($sum)]);
	}

	/*
     * Store MPESA Transaction
     */
	public function store($request)
	{
		// Shorten attributes
		$attributes = $request->data['attributes'];
		// Shorten event
		$event = $attributes['event'];
		// Shorten resource
		$resource = $event['resource'];

		$amount = round($resource['amount'], 0);

		// Get username
		$betterPhone = substr_replace($resource['sender_phone_number'], '0', 0, -9);

		$user = User::where('phone', $betterPhone)->first();

		$mpesaTransaction = new MPESATransaction;
		$mpesaTransaction->kopokopo_id = $request->data['id'];
		$mpesaTransaction->type = $request->data['type'];
		$mpesaTransaction->initiation_time = $attributes['initiation_time'];
		$mpesaTransaction->status = $attributes['status'];
		$mpesaTransaction->event_type = $event['type'];
		$mpesaTransaction->resource_id = $resource['id'];
		$mpesaTransaction->reference = $resource['reference'];
		$mpesaTransaction->origination_time = $resource['origination_time'];
		$mpesaTransaction->sender_phone_number = $resource['sender_phone_number'];
		$mpesaTransaction->amount = $amount;
		$mpesaTransaction->currency = $resource['currency'];
		$mpesaTransaction->till_number = $resource['till_number'];
		$mpesaTransaction->system = $resource['system'];
		$mpesaTransaction->resource_status = $resource['status'];
		$mpesaTransaction->sender_first_name = $resource['sender_first_name'];
		$mpesaTransaction->sender_middle_name = $resource['sender_middle_name'];
		$mpesaTransaction->sender_last_name = $resource['sender_last_name'];
		$mpesaTransaction->user_id = $user->id;
		$saved = $mpesaTransaction->save();

		$message = "Transaction Saved successfully";

		$this->updateUserSubscriptionPlan($amount, $user->id);

		return [$saved, $message, $mpesaTransaction, $user];
	}

	/*
     * Handle Search
     */
	public function search($query, $request)
	{
		$userId = $request->input("userId");

		if ($request->filled("userId")) {
			$query = $query->where("user_id", $userId);
		}

		return $query;
	}

	/**
	 * Send STK Push to Kopokopo.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function stkPush($request)
	{
		// Get phone in better format
		$betterPhone = substr_replace(auth('sanctum')->user()->phone, '+254', 0, -9);
		// $betterPhone = substr_replace("0700364446", '+254', 0, -9);

		// Get first and last name
		$parts = explode(" ", auth('sanctum')->user()->name);

		$lastname = array_pop($parts);

		$firstname = implode(" ", $parts);

		// $K2 = new K2($this->sandboxOptions());
		$K2 = new K2($this->liveOptions());

		// Get one of the services
		$tokens = $K2->TokenService();

		// Use the service
		$result = $tokens->getToken();

		if ($result['status'] == 'success') {
			$data = $result['data'];
			// echo "My access token is: " . $data['accessToken'] . " It expires in: " . $data['expiresIn'] . "<br>";
		}

		// STKPush
		$stk = $K2->StkService();
		$response = $stk->initiateIncomingPayment([
			'paymentChannel' => 'M-PESA STK Push',
			'tillNumber' => 'K433842',
			'firstName' => $firstname,
			'lastName' => $lastname,
			'phoneNumber' => $betterPhone,
			'amount' => $request->input('amount'),
			'currency' => 'KES',
			'email' => auth('sanctum')->user()->email,
			'callbackUrl' => 'https://property.black.co.ke/api/mpesa-transactions',
			'accessToken' => $data['accessToken'],
		]);

		if ($response['status'] == 'success') {
			$data = $result['data'];
			// echo "The resource location is: " . json_encode($response['location']);
			// => 'https://sandbox.kopokopo.com/api/v1/incoming_payments/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'
			return response(["message" => "Request sent to your phone"], 200);
		} else {
			return response(["message" => $response], 400);
		}
	}

	/*
	* Update User Subscription Plan
	*/
	public function updateUserSubscriptionPlan($amount, $id)
	{
		$userSubscriptionPlan = UserSubscriptionPlan::where("user_id", $id)
			->where("status", "pending")
			->first();

		$userSubscriptionPlan->user_id = $id;
		$userSubscriptionPlan->amount_paid = $amount;
		$userSubscriptionPlan->start_date = now();

		$months = $userSubscriptionPlan->billing_cycle == "monthly" ? 1 : 12;
		$userSubscriptionPlan->end_date = now()->addMonths($months);
		$userSubscriptionPlan->status = "active";
		$saved = $userSubscriptionPlan->save();
	}

	/*
     * Kopokopo Environment Variables
     */
	public static function sandboxOptions()
	{
		return [
			'clientId' => env('KOPOKOPO_CLIENT_ID_SANDBOX'),
			'clientSecret' => env('KOPOKOPO_CLIENT_SECRET_SANDBOX'),
			'apiKey' => env('KOPOKOPO_API_KEY_SANDBOX'),
			'baseUrl' => env('KOPOKOPO_BASE_URL_SANDBOX'),
		];
	}

	public static function liveOptions()
	{
		return [
			'clientId' => env('KOPOKOPO_CLIENT_ID'),
			'clientSecret' => env('KOPOKOPO_CLIENT_SECRET'),
			'apiKey' => env('KOPOKOPO_API_KEY'),
			'baseUrl' => env('KOPOKOPO_BASE_URL'),
		];
	}
}
