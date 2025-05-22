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
        Schema::create('pagos', function (Blueprint $table) {
            $table->id(); // PK

            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade'); // Quién realizó/registró el pago

            $table->foreignId('asignacion_unidad_id')->nullable() // Puede ser null si el pago no está atado a una unidad específica
                  ->constrained('asignacion_unidades')
                  ->onDelete('set null'); // Para qué unidad/asignación es el pago

            // Opcional: si un pago puede estar ligado directamente a una cartera específica
            // $table->foreignId('cartera_id')->nullable()
            //       ->constrained('carteras')
            //       ->onDelete('set null');

            $table->decimal('monto', 12, 2); // El valor del pago
            $table->date('fecha_pago'); // Fecha en que se realizó o registró el pago
            $table->string('metodo_pago')->nullable(); // Ej: 'PSE', 'Efectivo', 'Transferencia', 'Tarjeta de Crédito'
            $table->string('referencia_transaccion')->nullable(); // Código de referencia de la transacción bancaria o del sistema de pagos
            $table->string('concepto'); // Descripción breve del motivo del pago (Ej: "Administración Mayo 2025", "Reserva Salón Social", "Cuota Extraordinaria Arreglo Tejado")
            $table->string('estado')->default('completado'); // Ej: 'pendiente', 'completado', 'fallido', 'reembolsado', 'verificando'
            $table->text('observaciones')->nullable(); // Cualquier nota adicional sobre el pago

            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};
