<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Usuario que realiza la reserva
            $table->foreignId('instalacion_comun_id')->constrained('instalaciones_comunes')->onDelete('cascade'); // Instalación reservada

            $table->dateTime('fecha_hora_inicio');
            $table->dateTime('fecha_hora_fin');

            $table->string('estado')->default('solicitada'); // Ej: 'solicitada', 'confirmada', 'cancelada_usuario', 'cancelada_admin', 'completada', 'rechazada'

            // Si la reserva genera un pago y quieres enlazarlo directamente
            $table->foreignId('pago_id')->nullable()->constrained('pagos')->onDelete('set null');

            $table->integer('numero_asistentes')->nullable();
            $table->text('comentarios_solicitud')->nullable(); // Comentarios del usuario al solicitar
            $table->text('comentarios_aprobacion_rechazo')->nullable(); // Comentarios del admin al aprobar/rechazar
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
