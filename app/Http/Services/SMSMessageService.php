<?php

namespace App\Http\Services;

// AfricasTalking
use AfricasTalking\SDK\AfricasTalking;
use Illuminate\Support\Facades\Http;

class SMSMessageService extends Service
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sms = SMS::orderBy('created_at', 'DESC')->get();

        foreach ($sms as $key => $value) {
            // Get apartment
            $betterPhone = substr_replace($value->number, '0', 0, -9);

            $apartment = User::where('phone', $betterPhone)->value('apartment');

            // Assign network code to Telco that handled message
            if ($value->network_code == 63902) {
                $networkCode = "Safaricom";
            } elseif ($value->network_code == 63903) {
                $networkCode = "Airtel Kenya";
            } elseif ($value->network_code == 63907) {
                $networkCode = "Orange Kenya";
            } elseif ($value->network_code == 63999) {
                $networkCode = "Equitel Kenya";
            } else {
                $networkCode = $value->network_code;
            }

            // Create array
            $sms[$key] = [
                'apartment' => $apartment,
                'number' => substr_replace($value->number, '0', 0, -9),
                'text' => $value->text,
                'status' => $value->status,
                'statusCode' => $value->status_code,
                'cost' => $value->cost,
                'deliveryStatus' => $value->delivery_status,
                'networkCode' => $networkCode,
                'failureReason' => $value->failure_reason,
                'sent' => $value->created_at->format("D d M Y"),
            ];
        }

        return view('/pages/sms')->with(['sms' => $sms]);
        // return $newSms;

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->filled('apartment')) {

            Http::withHeaders([
                // 'apiKey' => 'be25ed4a43e7a6bddc176e0b38772afb52790ca0c29287b539cf390d3e08a73b',
                'apiKey' => '8c34325475a7d7d5644b04fb2aa1b1a0ddf123458b9980f36f594af699abd06f',
                // ])->post('https://api.sandbox.africastalking.com/auth-token/generate', [
            ])->post('https://api.africastalking.com/auth-token/generate', [
                // 'username' => 'sandbox',
                'username' => 'plot251',
            ]);

            $F = $request->input('apartment');
            $balance = $request->input('balance');
            $phone = $request->input('phone');
            $betterPhone = substr_replace($phone, '+254', 0, -9);
            $message = "Dear $F,\nYour Current Balance: KES $balance is still due.\nPay via Mpesa to Alphaxard Njoroge 0700364446 to avoid disconnection.\nThank you.";

            // Set your app credentials
            // $username = "sandbox";
            $username = "plot251";
            // $apiKey = "be25ed4a43e7a6bddc176e0b38772afb52790ca0c29287b539cf390d3e08a73b";
            $apiKey = "8c34325475a7d7d5644b04fb2aa1b1a0ddf123458b9980f36f594af699abd06f";

            // Initialize the SDK
            $AT = new AfricasTalking($username, $apiKey);

            // Get the SMS service
            $sms = $AT->sms();

            // Set the numbers you want to send to in international format
            $recipients = "+254700364446";
            // $recipients = $betterPhone;

            // Set your message
            // $message = "I'm a lumberjack and its ok, I sleep all night and I work all day";

            // Set your shortCode or senderId
            $from = "";

            if (strlen($betterPhone) > 5) {
                try {
                    // Thats it, hit send and we'll take care of the rest
                    $result = $sms->send([
                        'to' => $recipients,
                        'message' => $message,
                        'from' => $from,
                    ]);

                    foreach ($result as $key => $value) {
                        if (gettype($value) != "string") {
                            foreach ($value as $key1 => $value1) {
                                if (gettype($value1) != "string") {
                                    foreach ($value1 as $key2 => $value2) {
                                        if (gettype($value2) == "array") {
                                            foreach ($value2 as $key3 => $value3) {
                                                // Save to database
                                                $sms = new SMS;
                                                $sms->message_id = $value3->messageId;
                                                $sms->number = $value3->number;
                                                $sms->text = $message;
                                                $sms->status = $value3->status;
                                                $sms->status_code = $value3->statusCode;
                                                $sms->cost = $value3->cost;
                                                $sms->save();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (Exception $e) {
                    echo "Error: " . $e->getMessage();
                }
            }
            return redirect('water-readings')->with('success', 'Saved');
        } else {
            $sms = SMS::where('message_id', $request->id)->first();
            $sms->delivery_status = $request->input('status');
            $sms->network_code = $request->input('networkCode');
            $sms->failure_reason = $request->input('failureReason');
            $sms->retry_count = $request->input('retryCount');
            $sms->save();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(SMS $sMS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Store the received json in $callback
        $callback = file_get_contents('input:://input');
        // Decode the received json and store into $callbackurl
        $callbackUrl = json_decode($callback, true);

        // $callbackResponse = array(
        //     'id' => $callback['id'],
        //     'status' => $callback['status'],
        //     'phoneNumber' => $callback['phoneNumber'],
        //     'networkCode' => $callback['networkCode'],
        //     'failureReason' => $callback['failureReason'],
        //     'retryCount' => $callback['retryCount'],
        // );

        $sms = new SMS;
        $sms->message_id = $callback['id'];
        $sms->status = $callback['status'];
        $sms->number = $callback['phoneNumber'];
        // $sms->network_code = $request->networkCode;
        // $sms->failure_reason = $request->failureReason;
        // $sms->retry_count = $request->retryCount;
        $sms->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function destroy(SMS $sMS)
    {
        //
    }
}
