<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id(); // PK

            // Destinatario de la notificación (puede ser un usuario específico)
            $table->foreignId('user_id')->nullable()
                  ->constrained('users')
                  ->onDelete('cascade'); // Si se borra el usuario, se borran sus notificaciones

            // Unidad residencial a la que se dirige la notificación (si aplica)
            $table->foreignId('unidad_residencial_id')->nullable()
                  ->constrained('unidades_residenciales')
                  ->onDelete('cascade');

            $table->string('tipo'); // Ej: 'Anuncio General', 'Paquetería Recibida', 'Recordatorio de Pago', 'Mantenimiento Programado', 'Alerta de Seguridad'
            $table->string('titulo');
            $table->text('mensaje');
            $table->string('url_destino')->nullable(); // Un enlace opcional si la notificación lleva a alguna parte de la app
            $table->timestamp('leida_at')->nullable(); // Para marcar cuándo el usuario leyó la notificación
            $table->timestamp('programada_para')->nullable(); // Si la notificación debe enviarse en un futuro

            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificaciones');
    }
};
