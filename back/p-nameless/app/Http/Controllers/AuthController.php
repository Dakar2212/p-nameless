<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use App\Models\Role;

class AuthController extends Controller
{
    /**
     * Registrar un nuevo usuario y emitir token.
     */
    public function register(Request $req)
    {
        $data = $req->validate([
            'name'              => 'required|string|max:255',
            'email'               => 'required|string|email|max:255|unique:users,email',
            'password'            => 'required|string|confirmed|min:8',
            'documento_identidad' => 'required|string|unique:users,documento_identidad',
            'telefono'            => 'nullable|string|max:15',
            'foto_perfil'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            //'rol'                 => 'required|string|in:superadministrador,administrador,usuario,portero',
        ]);

        $pathFotoPerfil = null;
        if ($req->hasFile('foto_perfil') && $req->file('foto_perfil')->isValid()) {
            $pathFotoPerfil = $req->file('foto_perfil')->store('fotos_perfil', 'public');
        }

        $user = null;
        $token = null;


       DB::transaction(function () use ($data, $pathFotoPerfil, &$user, &$token) {
            // Crea el usuario
            $user = User::create([
                'name'                  => $data['name'],
                'email'                 => $data['email'],
                'password'              => Hash::make($data['password']),
                'documento_identidad'   => $data['documento_identidad'],
                'telefono'              => $data['telefono'] ?? null,
                'foto_perfil'           => $pathFotoPerfil,
            ]);

            // Asigna el rol
            // Si aquí ocurre el error, la creación del usuario se deshará (rollback).
            $user->assignRole('propietario');

            // Genera el token DENTRO de la transacción si todo fue bien
            $token = JWTAuth::fromUser($user);
        }); // Asigna el rol por defecto al usuario

        return response()->json([
            'message'      => 'Usuario registrado exitosamente!',
            'user'         => $user->load('roles'),
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
        ], 201);
    }

    /**
     * Autenticar usua rio y devolver token.
     */
    public function login(Request $req)
    {
        $creds = $req->only(['email', 'password']);

        if (! $token = JWTAuth::attempt($creds)) {
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
        ]);
    }

    /**
     * Retorna los datos del usuario autenticado.
     */
    public function me(Request $req)
    {
        return response()->json($req->user());
    }

    /**
     * Renueva el token JWT.
     */
    public function refresh()
    {
        try {
            $currentToken = JWTAuth::getToken();
            $newToken = JWTAuth::refresh($currentToken);

            return response()->json([
                'access_token' => $newToken,
                'token_type'   => 'bearer',
                'expires_in'   => auth('api')->factory()->getTTL() * 60,
            ]);
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'token_expired'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_refresh_token'], 500);
        }
    }

    /**
     * Invalida el token actual.
     */
    public function logout(Request $req)
    {
        try {
            $token = JWTAuth::getToken();
            if (! $token) {
                return response()->json(['error' => 'Token no proporcionado'], 400);
            }

            JWTAuth::invalidate($token);

            return response()->json(['message' => 'Logout exitoso'], 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Error al invalidar el token'], 500);
        }
    }

    /**
     * Invalida todos los tokens del usuario (multi-dispositivo).
     */
    public function logoutAll(Request $req)
    {
        try {
            $user = $req->user();
            if (! $user) {
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }

            auth()->logout(true);

            return response()->json(['message' => 'Logout de todos los dispositivos exitoso'], 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Error al cerrar sesiones'], 500);
        }
    }
}

