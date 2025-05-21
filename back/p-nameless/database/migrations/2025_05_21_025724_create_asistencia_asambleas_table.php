<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('asistencia_asambleas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asamblea_id')->constrained('asambleas')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // El usuario que asiste o está registrado

            // Para indicar qué unidad residencial representa este usuario en esta asamblea
            // Puede ser nullable si el asistente es, por ejemplo, un administrador sin unidad específica.
            $table->foreignId('asignacion_unidad_id')->nullable()->constrained('asignacion_unidades')->onDelete('set null');

            $table->string('tipo_asistencia')->default('presente'); // 'presente', 'apoderado', 'ausente_justificado', 'ausente_no_justificado'
            $table->foreignId('representado_por_user_id')->nullable()->constrained('users')->onDelete('set null'); // Si 'tipo_asistencia' es 'apoderado', este es el ID del apoderado
            $table->string('poder_documento_url')->nullable(); // Enlace al documento de poder
            $table->boolean('tiene_voto')->default(true);
            $table->text('comentarios_asistencia')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asistencia_asambleas');
    }
};
