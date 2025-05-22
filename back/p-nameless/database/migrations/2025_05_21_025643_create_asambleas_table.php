<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('asambleas', function (Blueprint $table) {
            $table->id();
            // Si las asambleas son por "conjunto" o "edificio principal"
            // $table->foreignId('conjunto_residencial_id')->constrained('conjuntos_residenciales')->onDelete('cascade');

            $table->string('titulo');
            $table->text('descripcion_motivo')->nullable();
            $table->dateTime('fecha_hora_convocatoria'); // Cuándo se anunció/convocó
            $table->dateTime('fecha_hora_celebracion'); // Cuándo se llevará a cabo
            $table->string('lugar'); // Ej: "Salón Comunal Principal", "Virtual - Zoom Link: ..."
            $table->string('tipo')->default('ordinaria'); // 'ordinaria', 'extraordinaria'
            $table->string('estado')->default('programada'); // 'programada', 'en_curso', 'finalizada', 'cancelada', 'pospuesta'
            $table->text('orden_del_dia')->nullable();
            $table->string('link_documentos_previos')->nullable(); // Enlace a PDFs con info previa
            $table->string('link_acta_final')->nullable(); // Enlace al PDF del acta una vez finalizada
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asambleas');
    }
};
