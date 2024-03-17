<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Manufacture extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'manufacture';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
'name',
'contact_no',
'email',
'contact_person',
'address',
'license',
'product_quantity',
'product_quality',
'clearance',
    ];


}
