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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cnic');
            $table->string('first_name');
            $table->string('last_name');
            $table->date('dob');
            $table->date('cnic_expiry');
            $table->enum('gender',['male','female']);
            $table->unsignedBigInteger('address_id');
            $table->unsignedBigInteger('role_id');
            $table->unsignedBigInteger('phone_number');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('status',['active','suspended','new']);
            $table->string('profile_picture')->nullable();
            $table->string('qualification');
            $table->foreign('address_id')->references('id')->on('address');
            $table->foreign('role_id')->references('id')->on('roles');

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
