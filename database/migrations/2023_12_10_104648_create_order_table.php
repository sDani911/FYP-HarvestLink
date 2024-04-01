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
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('driver_id')->nullable();
            $table->unsignedBigInteger('shipping_company_id');
            $table->unsignedBigInteger('crop_id');
            $table->unsignedBigInteger('manufacture_id')->nullable();
            $table->datetime('pickup_time')->nullable();
            $table->datetime('delivery_time');
            $table->string('pickup_location');
            $table->string('delivery_location');
            $table->unsignedBigInteger('cost');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('driver_id')->references('id')->on('driver');
            $table->foreign('shipping_company_id')->references('id')->on('shipping_company');
            $table->foreign('crop_id')->references('id')->on('crop');
            $table->foreign('manufacture_id')->references('id')->on('manufacture');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order');
    }
};
