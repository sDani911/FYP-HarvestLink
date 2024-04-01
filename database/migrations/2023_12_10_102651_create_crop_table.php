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
        Schema::create('crop', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->unsignedBigInteger('quantity');
            $table->date('start_date');
            $table->date('end_date');
            $table->unsignedBigInteger('seed_price');
            $table->unsignedBigInteger('fertilizer_price');
            $table->string('fertilizer_name');
            $table->unsignedBigInteger('fertilizer_quantity');
            $table->string('pesticide_name');
            $table->unsignedBigInteger('pesticide_price');
            $table->unsignedBigInteger('selling_price')->nullable();
            $table->text('description')->nullable();
            $table->string('status');
            $table->unsignedBigInteger('farm_id');
            $table->foreign('farm_id')->references('id')->on('farm_record');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop');
    }
};
