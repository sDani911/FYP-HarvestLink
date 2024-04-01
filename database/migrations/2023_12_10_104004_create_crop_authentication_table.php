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
        Schema::create('crop_authentication', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('farm_id');
            $table->unsignedBigInteger('crop_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('authenticatedBy')->nullable();
            $table->string('grade_assign');
            $table->date('request_date');
            $table->date('completion_date')->nullable();
            $table->foreign('farm_id')->references('id')->on('farm_record');
            $table->foreign('crop_id')->references('id')->on('crop');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('authenticatedBy')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_authentication');
    }
};
