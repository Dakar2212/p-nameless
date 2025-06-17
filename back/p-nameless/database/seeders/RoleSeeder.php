<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Role::create(['name' => 'Administrador', 'slug' => 'admin', 'description' => 'Acceso total al sistema']);
        //Role::create(['name' => 'Propietario', 'slug' => 'propietario', 'description' => 'Dueño de una unidad residencial']);
        //Role::create(['name' => 'Residente', 'slug' => 'residente', 'description' => 'Habitante de una unidad residencial']);

        Role::firstOrCreate(
            ['slug' => 'super-admin'], // Atributos para buscar
            [ // Atributos para crear/actualizar si no se encuentra o si usas updateOrCreate
                'name' => 'Super Administrador',
                'description' => 'Acceso total al sistema, incluyendo gestión de roles y permisos'
            ]
        );

        Role::firstOrCreate(
            ['slug' => 'admin'], // Atributos para buscar
            [ // Atributos para crear/actualizar si no se encuentra o si usas updateOrCreate
                'name' => 'Administrador',
                'description' => 'Acceso total al sistema'
            ]
        );

        Role::firstOrCreate(
            ['slug' => 'propietario'],
            [
                'name' => 'Propietario',
                'description' => 'Dueño de una unidad residencial'
            ]
        );

        Role::firstOrCreate(
            ['slug' => 'residente'],
            [
                'name' => 'Residente',
                'description' => 'Habitante de una unidad residencial'
            ]
        );

        Role::firstOrCreate(
            ['slug' => 'portero'],
            [
                'name' => 'Portero',
                'description' => 'Encargado de la seguridad y mantenimiento de la unidad residencial'
            ]
        );

    }
}
