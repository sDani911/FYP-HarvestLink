<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RoleSeeder extends Seeder
{

    public function run()
    {
        Schema::disableForeignKeyConstraints();   //here we are disabling it so that if there are any parent/child relations
        if (Schema::hasTable('roles')) {
            DB::table('roles')->truncate();
        }
        Schema::enableForeignKeyConstraints();

        // again enabling to maintain all relations (parent/child) will all other tables to ensure the smooth functioning

        $roles = $this->getRoles();  // it is a php function from php.net which returns an array.

        foreach ($roles as $role) {


            Role::firstOrCreate($role);
        }
    }

    /**
     * Get the roles data from an external source (e.g., array, configuration file).
     */

    private function getRoles()
    {
        // Alternatively, you can define the roles directly in the seeder:
        return [
            [
                'title' => 'Super Admin',
                'permission_id' => [1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30, 31,32,
                    33,34,35,36,37,38,39],
                'description' => 'Super Admin',
            ],
            [
                'title' => 'User',
                'permission_id' => [5],
                'description' => 'Normal User',
                // User has access to some modules and sub-modules
            ],
            [
                'title' => 'Admin',
                'permission_id' => [1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30, 31,32,
                    33,34,35,36,37,38,39],
                'description' => 'Admin User',
                // User has access to some modules and sub-modules
            ],
            [
                'title' => 'Farmer',
                'permission_id' => [5],
                'description' => 'Farmer User',
                // User has access to some modules and sub-modules
            ],
            [
                'title' => 'Manufacturer',
                'permission_id' => [5],
                'description' => 'Manufacture User',
                // User has access to some modules and sub-modules
            ],
            [
                'title' => 'Driver',
                'permission_id' => [5],
                'description' => 'Driver User',
                // User has access to some modules and sub-modules
            ],
            [
                'title' => 'ShippingCompany',
                'permission_id' => [5],
                'description' => 'Shipping Company User',
                // User has access to some modules and sub-modules
            ]
        ];
    }
}
