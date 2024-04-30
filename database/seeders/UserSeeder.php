<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dob = Carbon::create(2000, 1, 1);
        $expire = Carbon::create(2030, 1, 1);
        $superAdmin = User::where(['email' => 'admin@gmail.com'])->first();
        if(!$superAdmin){
            DB  ::table('users')->insert([
                'cnic' => '123456789',
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'dob' => $dob,
                'cnic_expiry' => $expire,
                'gender' => 'male',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password'),
                'address_id' => 1,
<<<<<<< HEAD
                'role_id' => 1,
=======
                'role_id' => 3,
>>>>>>> 5a8f618161e399c0ae5055468b878d4a350e9c5d
                'phone_number' => '123456789',
                'status' => 'active',
                'qualification' => 'admin',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
