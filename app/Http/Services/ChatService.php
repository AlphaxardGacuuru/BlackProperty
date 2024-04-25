<?php

namespace App\Http\Services;

use App\Http\Resources\ChatResource;
use App\Models\Chat;
use App\Models\User;

class ChatService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $arrayOfUserIds = Chat::where('user_id', $this->id)
            ->orWhere('to', $this->id)
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function ($chat) {
                return [
                    $chat->user_id != $this->id ? $chat->user_id : null,
                    $chat->to != $this->id ? $chat->to : null,
                ];
            })
            ->flatten()
            ->filter()
            ->unique();

        $chatThreads = [];

        // Get threads
        foreach ($arrayOfUserIds as $userId) {
            $chat = Chat::where('user_id', $this->id)
                ->where('to', $userId)
                ->orWhere('user_id', $userId)
                ->where('to', $this->id)
                ->orderBy('id', 'DESC')
                ->first();

            // Get user info
            $chatUser = User::find($userId);

            array_push($chatThreads, [
                'id' => $chat->id,
                'name' => $chatUser->name,
                'avatar' => $chatUser->avatar,
                'accountType' => $chatUser->account_type,
                'userId' => $userId,
                'to' => $chat->to,
                'text' => $chat->text,
                // 'hasMedia' => $chat->media,
                'createdAt' => $chat->created_at,
            ]);
        }

        return ["data" => $chatThreads];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $chats = Chat::where("user_id", $this->id)
            ->where("to", $id)
            ->orWhere("user_id", $id)
            ->where("to", $this->id)
            ->orderBy('id', 'ASC')
            ->get();

        return ChatResource::collection($chats);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        /* Create new post */
        $chat = new Chat;
        $chat->user_id = auth("sanctum")->user()->id;
        $chat->to = $request->input('to');
        $chat->text = $request->input('text');
        // $chat->media = $request->input('media');
        $saved = $chat->save();

        $message = "Chat sent";

        return [$saved, $message, $chat];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $chat = Chat::find($id);

        // $media = substr($chat->media, 9);

        // Storage::delete('public/' . $media);

        $deleted = $chat->delete();

        return [$deleted, "Chat deleted", $chat];
    }
}
