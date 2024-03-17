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
        Schema::create('debug_logs', function (Blueprint $table) {
            $table->id();
            $table->String('name')->nullable();
            $table->text('message')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(); // An example foreign key column
            $table->text('request')->nullable();
            $table->text('response')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('debug_logs');
    }
};
