<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

//Rutas públicas (middleware 'api', prefijo 'auth')
Route::group(['prefix'=>'auth'], function() {
    Route::post('register', [AuthController::class,'register']);
    Route::post('login',    [AuthController::class,'login']);
    Route::post('logout',   [AuthController::class,'logout']);
    Route::post('refresh',  [AuthController::class,'refresh']);
    Route::post('me',       [AuthController::class,'me']);
  });

  // Rutas protegidas por JWT
  Route::middleware('auth:api')->group(function() {
    Route::get('user', fn(Request $r)=> $r->user());
    Route::apiResource('tasks', TaskController::class);
  });
