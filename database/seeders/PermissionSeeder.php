<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();   //here we are disabling it so that if there are any parent/child relations
        // with other tables, it should not stop us from doing what we want or prompt any errors.

        if(Schema::hasTable('permissions')){
            DB::table('permissions')->truncate();
        }
        // this function here makes sure that after running the seeder duplication of data is ignored so if there is data
        // already in the table, first it will drop/empty the table then store latest permissions

        Schema::enableForeignKeyConstraints();

        // again enabling to maintain all relations (parent/child) will all other tables to ensure the smooth functioning

        $permissions = $this->getPermissions();   // it is a php function from php.net which returns an array.

        foreach ($permissions as $permission) {
            Permission::firstOrCreate($permission);
        }
    }
    /**
     * Get the permissions data from an external source (e.g., array, configuration file).
     */
    private function getPermissions()
    {
        return [
            [
                'name' => 'roleView',
                'description' => 'This will allow to view the roles',
                'category' => 'role'
            ],
            [
                'name' => 'roleAdd',
                'description' => 'This will allow to add the roles',
                'category' => 'role'
            ],
            [
                'name' => 'roleUpdate',
                'description' => 'This will allow to update the roles',
                'category' => 'role'
            ],
            [
                'name' => 'roleDelete',
                'description' => 'This will allow to delete the roles',
                'category' => 'role'
            ],
            [
                'name' => 'normalUser',
                'description' => 'This will redirect user to store',
                'category' => 'user'
            ],
            [
                'name' => 'adminUser',
                'description' => 'This will redirect user to Admin Dashboard',
                'category' => 'user'
            ],
            [
                'name' => 'productUnitView',
                'description' => 'This will allow to view the Product unit',
                'category' => 'Product_unit'
            ],
            [
                'name' => 'productUnitAdd',
                'description' => 'This will allow to add the Product unit',
                'category' => 'Product_unit'
            ],
            [
                'name' => 'productUnitUpdate',
                'description' => 'This will allow to update the Product unit',
                'category' => 'Product_unit'
            ],
            [
                'name' => 'productUnitDelete',
                'description' => 'This will allow to delete the Product unit',
                'category' => 'Product_unit'
            ],
            [
                'name' => 'productView',
                'description' => 'This will allow to view the Product',
                'category' => 'Product'
            ],
            [
                'name' => 'productAdd',
                'description' => 'This will allow to add the Product',
                'category' => 'Product'
            ],
            [
                'name' => 'productUpdate',
                'description' => 'This will allow to update the Product',
                'category' => 'Product'
            ],
            [
                'name' => 'productDelete',
                'description' => 'This will allow to delete the Product',
                'category' => 'Product'
            ],
            [
                'name' => 'canApproved',
                'description' => 'This will allow to approve the User',
                'category' => 'approve'
            ],
            [
                'name' => 'orderView',
                'description' => 'This will allow to view the Order',
                'category' => 'order'
            ],
            [
                'name' => 'orderAdd',
                'description' => 'This will allow to add the Order',
                'category' => 'order'
            ],
            [
                'name' => 'orderUpdate',
                'description' => 'This will allow to update the Order',
                'category' => 'order'
            ],
            [
                'name' => 'orderDelete',
                'description' => 'This will allow to delete the Order',
                'category' => 'order'
            ],
            [
                'name' => 'invoiceView',
                'description' => 'This will allow to view the Invoice',
                'category' => 'invoice'
            ],
            [
                'name' => 'invoiceAdd',
                'description' => 'This will allow to add the Invoice',
                'category' => 'invoice'
            ],
            [
                'name' => 'invoiceUpdate',
                'description' => 'This will allow to update the Invoice',
                'category' => 'invoice'
            ],
            [
                'name' => 'invoiceDelete',
                'description' => 'This will allow to delete the Invoice',
                'category' => 'invoice'
            ],
            [
                'name' => 'settingView',
                'description' => 'This will allow to view the Setting',
                'category' => 'setting'
            ],
            [
                'name' => 'settingAdd',
                'description' => 'This will allow to add the Setting',
                'category' => 'setting'
            ],
            [
                'name' => 'settingUpdate',
                'description' => 'This will allow to update the Setting',
                'category' => 'setting'
            ],
            [
                'name' => 'settingDelete',
                'description' => 'This will allow to delete the Setting',
                'category' => 'setting'
            ],
            [
                'name' => 'otherChargeView',
                'description' => 'This will allow to view the Other Charges',
                'category' => 'other_charge'
            ],
            [
                'name' => 'otherChargeAdd',
                'description' => 'This will allow to add the Other Charges',
                'category' => 'other_charge'
            ],
            [
                'name' => 'otherChargeUpdate',
                'description' => 'This will allow to update the Other Charges',
                'category' => 'other_charge'
            ],
            [
                'name' => 'otherChargeDelete',
                'description' => 'This will allow to delete the Other Charges',
                'category' => 'other_charge'
            ],
            [
                'name' => 'addressView',
                'description' => 'This will allow to view the address',
                'category' => 'address'
            ],
            [
                'name' => 'addressAdd',
                'description' => 'This will allow to add the address',
                'category' => 'address'
            ],
            [
                'name' => 'addressUpdate',
                'description' => 'This will allow to update the address',
                'category' => 'address'
            ],
            [
                'name' => 'addressDelete',
                'description' => 'This will allow to delete the address',
                'category' => 'address'
            ],
            [
                'name' => 'customersView',
                'description' => 'This will allow to view the customers',
                'category' => 'customers'
            ],
            [
                'name' => 'customersAdd',
                'description' => 'This will allow to add the customers',
                'category' => 'customers'
            ],
            [
                'name' => 'customersUpdate',
                'description' => 'This will allow to update the customers',
                'category' => 'customers'
            ],
            [
                'name' => 'customersDelete',
                'description' => 'This will allow to delete the customers',
                'category' => 'customers'
            ],
        ];
    }
}
