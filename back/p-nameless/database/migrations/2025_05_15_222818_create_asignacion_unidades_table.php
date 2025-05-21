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
        Schema::create('asignacion_unidades', function (Blueprint $table) {
            $table->id(); // PK

            // Relación con la tabla users
            $table->foreignId('user_id')
                  ->constrained('users') // Asume que tu tabla de usuarios se llama 'users'
                  ->onDelete('cascade'); // Si se borra un usuario, se borran sus asignaciones

            // Relación con la tabla unidades_residenciales
            $table->foreignId('unidad_residencial_id')
                  ->constrained('unidades_residenciales')
                  ->onDelete('cascade'); // Si se borra una unidad, se borran sus asignaciones

            $table->string('tipo_relacion'); // Ej: 'propietario', 'arrendatario', 'residente_autorizado', 'responsable auxiliar', 'acudiente'
            $table->date('fecha_inicio_relacion')->nullable(); // Cuándo inició esta relación
            $table->date('fecha_fin_relacion')->nullable();   // Cuándo termina (para arrendatarios, etc.)
            $table->boolean('es_responsable_pago')->default(false); // Indica si este usuario en esta unidad es el principal responsable de pagos
            $table->boolean('es_activo')->default(true); // Para desactivar una asignación sin borrarla

            $table->timestamps(); // created_at y updated_at

            // Opcional: Cláusula unique para evitar duplicados si tiene sentido para tu lógica
            // Por ejemplo, un usuario no debería tener la misma 'tipo_relacion' activa dos veces para la misma unidad.
            // $table->unique(['user_id', 'unidad_residencial_id', 'tipo_relacion', 'es_activo'], 'user_unidad_tipo_rel_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignacion_unidades');
    }
};
