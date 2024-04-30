<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Order extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'order';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'driver_id',
        'crop_id',
        'manufacture_id',
        'shipping_company_id',
        'pickup_time',
        'delivery_time',
        'pickup_location',
        'delivery_location',
        'cost',
        'status',
    ];
    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driver_id');
    }

}
