<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * Los usuarios que pertenecen a este rol.
     */
    public function users()
    {
        // Define la relación Muchos-a-Muchos con el modelo User
        // Laravel asumirá la tabla pivote 'role_user' (nombres en singular, orden alfabético)
        // Si la tabla pivote o las claves foráneas fueran diferentes, se especificarían aquí.
        // Si tu tabla pivote tiene timestamps (created_at, updated_at), añade ->withTimestamps()
        return $this->belongsToMany(User::class);
    }
}
