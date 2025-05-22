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
        Schema::create('unidades_residenciales', function (Blueprint $table) {
            $table->id();
            // Si tienes un "Conjunto" o "Edificio" que agrupa unidades, aquí iría:
            // $table->foreignId('conjunto_id')->constrained('conjuntos_residenciales')->onDelete('cascade');
            $table->string('numero_unidad'); // Ej: "101", "A-203", "Casa 15"
            $table->string('torre_bloque')->nullable(); // Ej: "Torre A", "Bloque 3", "Manzana C"
            $table->integer('estrato')->nullable();
            $table->decimal('area_m2', 10, 2)->nullable(); // Área en metros cuadrados
            $table->text('descripcion_adicional')->nullable(); // Cualquier otra descripción
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unidades_residenciales');
    }
};
