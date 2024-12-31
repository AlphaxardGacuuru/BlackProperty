<?php

namespace App\Http\Services;

// AfricasTalking
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
        $sms = SMS::where('message_id', $request->id)->first();
        $sms->delivery_status = $request->input('status');
        $sms->network_code = $request->input('networkCode');
        $sms->failure_reason = $request->input('failureReason');
        $sms->retry_count = $request->input('retryCount');
        $sms->save();
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
