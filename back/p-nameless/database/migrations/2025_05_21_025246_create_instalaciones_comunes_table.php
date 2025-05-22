<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instalaciones_comunes', function (Blueprint $table) {
            $table->id();
            // Si las instalaciones pertenecen a un "conjunto" o "edificio principal"
            // y tienes una tabla para eso, aquí iría la FK. Ejemplo:
            // $table->foreignId('conjunto_residencial_id')->constrained('conjuntos_residenciales')->onDelete('cascade');

            $table->string('nombre'); // Ej: "Salón Social Principal", "Piscina Adultos", "Cancha de Squash #1"
            $table->text('descripcion')->nullable();
            $table->integer('capacidad_maxima')->nullable();
            $table->boolean('requiere_pago_reserva')->default(false);
            $table->decimal('costo_reserva', 10, 2)->nullable(); // Solo aplica si requiere_pago_reserva es true
            $table->text('reglas_uso')->nullable();
            $table->string('horario_disponible')->nullable(); // Ej: "L-V 9am-10pm, S-D 8am-12pm" o JSON con estructura
            $table->boolean('esta_disponible')->default(true); // Para habilitar/deshabilitar la instalación para reservas
            $table->string('ubicacion_especifica')->nullable(); // Ej: "Torre A, Piso -1", "Al lado de la portería"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instalaciones_comunes');
    }
};
