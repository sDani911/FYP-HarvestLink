<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class FarmRecord extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'farm_record';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
'name',
'address_id',
'size',
'date_of_establishment',
'climate_zone',
    ];
    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id');
    }


}
