<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contratos', function (Blueprint $table) {
            $table->id();
            // Si los contratos son a nivel de "conjunto" o "edificio principal"
            // $table->foreignId('conjunto_residencial_id')->constrained('conjuntos_residenciales')->onDelete('cascade');

            $table->string('tipo_contrato'); // Ej: 'Mantenimiento Ascensor', 'Vigilancia', 'Personal Aseo', 'Administración Propiedad Horizontal'
            $table->string('nombre_proveedor_contratista'); // Nombre de la empresa o persona
            $table->string('identificacion_proveedor')->nullable(); // NIT, CC del proveedor
            $table->text('objeto_contrato'); // Descripción del servicio o producto
            $table->date('fecha_inicio');
            $table->date('fecha_fin')->nullable();
            $table->integer('duracion_meses')->nullable();
            $table->decimal('monto_contrato', 15, 2)->nullable(); // Valor total o mensual
            $table->string('moneda', 3)->default('COP');
            $table->string('estado')->default('activo'); // 'activo', 'finalizado', 'cancelado', 'en_negociacion'
            $table->string('documento_adjunto_url')->nullable(); // Enlace al PDF del contrato
            $table->text('observaciones_generales')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contratos');
    }
};
