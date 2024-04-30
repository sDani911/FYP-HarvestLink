<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class CropAuthentication extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'crop_authentication';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'farm_id',
'crop_id',
'user_id',
'grade_assign',
'request_date',
'completion_date',
    ];

    public function crop()
    {
        return $this->belongsTo(Crop::class, 'crop_id', 'id');
    }
    public function AuthenitactedBy()
    {
        return $this->belongsTo(User::class, 'authenticatedBy', 'id');
    }


}
