<?php

namespace Database\Seeders;

use App\Models\Address;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            DB  ::table('address')->insert([
                'country' => 'Pakistan',
                'state' => 'Punjab',
                'city' => 'Lahore',
                'street' => 'JoharTown',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
    }
}
