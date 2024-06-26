<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'cnic',
        'first_name',
        'last_name',
        'dob',
        'cnic_expiry',
        'gender',
        'address_id',
        'role_id',
        'phone_number',
        'email',
        'password',
        'status',
        'profile_picture',
        'qualification',
    ];
    public function crops()
    {
        return $this->belongsToMany(Crop::class, 'crop_authentication', 'user_id', 'crop_id');
    }
    public function shippingCompany()
    {
        return $this->belongsTo(ShippingCompany::class);
    }
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
