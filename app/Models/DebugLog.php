<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DebugLog extends Model
{
    use HasFactory;
    protected $table = 'debug_logs';

    protected $fillable = [
        'name',
        'message',
        'user_id',
        'request',
        'response',
    ];

    public static function saveLog($name = null,$message = null,$user_id = null,$request = null,$response = null)
    {
        $logData = [
            'name' => $name,
            'message' => $message,
            'user_id' => $user_id,
            'request' => $request,
            'response' => $response,
        ];
        return self::create($logData);
    }

}
