<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShippingCompany extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'shipping_company';
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
'government_clearance',
'license_number'
    ];
    public function drivers()
    {
        return $this->hasMany(Driver::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
