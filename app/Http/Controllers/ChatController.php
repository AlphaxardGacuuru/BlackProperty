<?php

namespace App\Http\Controllers;

use App\Events\NewChatEvent;
use App\Http\Services\ChatService;
use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function __construct(protected ChatService $service)
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
        return $this->service->index();
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
            "to" => "required|string",
            "text" => "required|string|max:65535",
        ]);

        [$saved, $message, $chat] = $this->service->store($request);

        NewChatEvent::dispatchIf($saved, $chat, $chat->recipient);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $chat,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Chat  $chat
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
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $chat] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $chat,
        ], 200);
    }
}
