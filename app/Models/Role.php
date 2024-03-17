<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Role extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'roles';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
'permission_id',
'description'
    ];
    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

    public function getPermissionIdAttribute($value)
    {
        return explode(',', $value);
    }

    public function setPermissionIdAttribute($value)
    {
        $this->attributes['permission_id'] = implode(',', $value);

    }
}
