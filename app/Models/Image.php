<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'images';

    protected $fillable = [
        'image',
        'default',
        'module_name',
        'module_id',
        'created_by',
    ];

    /**
     * Find expense id for a specific organization
     *
     * @param  integer $id
     * @return mixed
     */
    public static function exists($id, $moduleId, $userId)
    {
        return self::where('id', $id)->where('module_id', $moduleId)->where('created_by', $userId)->exists();
    }


}
