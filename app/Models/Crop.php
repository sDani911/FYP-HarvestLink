<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Crop extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'crop';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    //status -> Harvesting -> OnMarketPlace -> Booked
    protected $fillable = [
        'name',
'type',
'user_id',
'quantity',
'unit',
'start_date',
'end_date',
'seed_price',
'fertilizer_price',
'fertilizer_name',
'fertilizer_quantity',
'fertilizer_quantity_unit',
'pesticide_name',
'pesticide_price',
'selling_price',
'description',
'status',
    ];

    public function cropAuthentications()
    {
        return $this->hasMany(CropAuthentication::class, 'crop_id', 'id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'crop_authentication', 'crop_id', 'user_id');
    }
    public function farm()
    {
        return $this->belongsTo(FarmRecord::class, 'farm_id');
    }
}
