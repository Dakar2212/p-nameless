<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Contracts\JWTSubject as JWTSubjectContract;
use Laravel\Sanctum\HasApiTokens;
Use App\Models\Role;

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
        'foto_perfil',
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
        foreach ($this->roles as $role) {
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
    // app/Models/User.php

public function assignRole($role): void
{
    \Log::info('Iniciando assignRole para usuario ID: ' . $this->id . ' con el rol: ' . (is_string($role) ? $role : 'objeto/id'));

    if (is_string($role)) {
        $roleModel = Role::where('slug', $role)->orWhere('name', 'like', $role)->first();
    } elseif (is_int($role)) {
        $roleModel = Role::find($role);
    } elseif ($role instanceof Role) {
        $roleModel = $role;
    } else {
        \Log::error('assignRole: Tipo de rol no soportado para usuario ID: ' . $this->id);
        return;
    }

    if (!$roleModel) {
        \Log::warning('assignRole: No se encontró el rol "' . (is_string($role) ? $role : '') . '" en la base de datos. Usuario ID: ' . $this->id);
        return;
    }

    if ($this->hasRole($roleModel->slug)) {
        \Log::info('assignRole: El usuario ID: ' . $this->id . ' ya tiene el rol: ' . $roleModel->slug . '. No se tomará ninguna acción.');
    } else {
        \Log::info('assignRole: Adjuntando rol ID: ' . $roleModel->id . ' (' . $roleModel->slug . ') al usuario ID: ' . $this->id);
        $this->roles()->attach($roleModel->id);
        // Forzamos la recarga de la relación 'roles' en la instancia actual del modelo
        $this->load('roles');
    }
}

    /**
     * Helper para remover un rol del usuario.
     *
     * @param string|int|Role $role El slug, nombre, ID o instancia del modelo Role.
     * @return void
     */
    public function removeRole($role): void
    {
        if (is_string($role)) {
            $roleModel = Role::where('slug', $role)->orWhere('name', $role)->first();
        } elseif (is_int($role)) {
            $roleModel = Role::find($role);
        } elseif ($role instanceof Role) {
            $roleModel = $role;
        } else {
            return;
        }

        if ($roleModel) {
            $this->roles()->detach($roleModel->id);
        }
    }
}
