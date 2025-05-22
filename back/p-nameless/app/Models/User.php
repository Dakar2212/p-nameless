<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Contracts\JWTSubject as JWTSubjectContract;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'documento_identidad',
        'telefono',
        //'foto_perfil',
        'rol',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Helper para verificar si el usuario tiene un rol específico (por slug o nombre).
     *
     * @param string $roleIdentifier El slug o nombre del rol.
     * @return bool
     */
    public function hasRole(string $roleIdentifier): bool
    {
        foreach (this->roles as $role) {
            if ($role->name === $roleIdentifier || $role->slug === $roleIdentifier) {
                return true;
            }
        }
        return false;
    }
    /**
     * Helper para asignar un rol al usuario.
     *
     * @param string|int|Role $role El slug, ID o instancia del modelo Role.
     */
    public function assignRole($role)
    {
        if (is_string($role)) {
            $role = Role::where('slug', $role)->orWhere('name', $role)->firstOrFail();
        } elseif (is_int($role)) {
            $role = Role::findOrFail($role);
        }

        if ($role instanceof Role && !$this->hasRole($role->slug)) {
            $this->roles()->attach($role->id);
        }
    }
}
