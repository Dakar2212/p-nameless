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
        Schema::create('carteras', function (Blueprint $table) {
            $table->id(); // PK

            // Relaciona la cartera con la asignación específica de un usuario a una unidad.
            // Esto es más preciso que relacionarla solo con la unidad_residencial_id,
            // ya que diferentes usuarios (propietario, arrendatario) podrían tener
            // diferentes responsabilidades o carteras asociadas a la misma unidad.
            $table->foreignId('asignacion_unidad_id')
                  ->constrained('asignacion_unidades')
                  ->onDelete('cascade'); // Si se elimina la asignación, se elimina la cartera asociada.

            $table->string('nombre_cartera')->default('Principal'); // Ej: "Administración", "Cuota Extraordinaria Fachada", "Multas"
            $table->decimal('saldo_actual', 12, 2)->default(0.00); // El saldo actual de esta cartera
                                                                // (puede ser positivo o negativo si hay deudas/créditos)
                                                                // Este campo se actualizaría con cada pago o cargo.
            $table->text('descripcion_o_acuerdos_pago')->nullable(); // Para notas, o tu campo 'acuerdos_pago'.

            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carteras');
    }
};
