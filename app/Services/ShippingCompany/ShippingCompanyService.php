<?php

namespace App\Services\ShippingCompany;

use App\Models\Address;
use App\Models\Driver;
use App\Models\Order;
use App\Models\Role;
use App\Models\ShippingCompany;
use App\Models\DebugLog;
use App\Models\User;
use App\Models\Vehicle;
use Carbon\Carbon;
use Carbon\Traits\Date;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class ShippingCompanyService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "ShippingCompany";
    }
    /**
     * Get all ShippingCompany
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function shippingCompanylist($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $shippingCompany = ShippingCompany::query();

            if($search){
                $shippingCompany = $shippingCompany->where('name', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $shippingCompany = $shippingCompany->where('type', $filter);
            }

            if($view){
                $shippingCompany = $shippingCompany->paginate($view, ['*'], 'page', $page);
            } else {
                $shippingCompany = $shippingCompany->get();
            }

            return $shippingCompany;
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    public function ShippingCompanyRoutes($view = null, $page = null,$search = null, $filter = null, $shipID)
    {
        try {
            $routes = Order::where('shipping_company_id',$shipID);

            if($search){
                $routes = $routes->where('name', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $routes = $routes->where('type', $filter);
            }

            if($view){
                $routes = $routes->paginate($view, ['*'], 'page', $page);
            } else {
                $routes = $routes->get();
            }

            return $routes;
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    public function shippingCompanyDriverlist($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            // Retrieve the currently logged-in user
            $user = Auth::user();

            // Retrieve the shipping company associated with the user
            $shippingCompany = ShippingCompany::where('user_id', $user->id)->first();

            // If shipping company not found for the user, throw an exception
            if (!$shippingCompany) {
                throw new Exception('User does not have a shipping company.');
            }

                $drivers = $shippingCompany->drivers()->where('availability_status','yes')->with('user')->get();

            return $drivers;
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    public function shippingCompanyDriverData($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            // Retrieve the currently logged-in user
            $user = Auth::user();

            // Retrieve the shipping company associated with the user
            $shippingCompany = ShippingCompany::where('user_id', $user->id)->first();

            // If shipping company not found for the user, throw an exception
            if (!$shippingCompany) {
                throw new Exception('User does not have a shipping company.');
            }

            // Eager load the drivers with their user and vehicle relations
            if ($view) {
                $drivers = $shippingCompany->drivers()->with('user', 'vehicle')->paginate($view, ['*'], 'page', $page);
            }else{
                $drivers = $shippingCompany->drivers()->with('user', 'vehicle')->get();
            }


            return $drivers;
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a shippingCompany
     *
     * @param array $data
     * @return mixed
     */
    public function store($data,$user_id)
    {
        try {

            $shippingCompany = ShippingCompany::create([
                'user_id'       => $user_id,
                'name' => $data['shippingCompanyInfo']['name'],
                'contact_no'    => $data['shippingCompanyInfo']['contactNo'],
                'email'   => $data['shippingCompanyInfo']['email'],
                'contact_person'   => $data['shippingCompanyInfo']['contactPerson'],
                'government_clearance'   => 'No',
                'license_number'   => $data['shippingCompanyInfo']['licenseNumber'],
            ]);

            //Driver
            $role = Role::where('title','Driver')->first();
            $address = Address::create([
                'street'=>$data['userInfo']['street'],
                'city'=>$data['userInfo']['city'],
                'country'=>$data['userInfo']['country'],
                'state'=>$data['userInfo']['state'],
            ]);
            $user = User::create([
                'cnic'      => $data['userInfo']['cnic'],
                'first_name'     => $data['userInfo']['firstName'],
                'last_name'   => $data['userInfo']['lastName'],
                'dob'  => $data['userInfo']['dateOfBirth'],
                'cnic_expiry'  => $data['userInfo']['cnicExpiry'],
                'gender'  => $data['userInfo']['gender'],
                'address_id'  => $address->id,
                'role_id'  => $role->id,
                'phone_number'  => $data['userInfo']['phoneNumber'],
                'email'  => $data['userInfo']['email'],
                'password'  => bcrypt($data['userInfo']['password']),
                'status'  => 'active',
                'profile_picture'  => $data['userInfo']['profilePicture'],
                'qualification'  => $data['userInfo']['qualification'],
            ]);

            $vehicle = Vehicle::create([
                'type'       => $data['vehicleInfo']['type'],
                'registration' => $data['vehicleInfo']['registration'],
                'license_number'    => $data['vehicleInfo']['licenseNumber'],
                'availability_status'   => 'Yes',
                'insurance'   => $data['vehicleInfo']['insurance'],
                'condition'   => $data['vehicleInfo']['condition'],
            ]);

            $driver = Driver::create([
                'user_id'       => $user->id,
                'vehicle_id' => $vehicle->id,
                'shipping_company_id'    => $shippingCompany->id,
                'license_number'   => $data['vehicleInfo']['licenseNumber'],
                'availability_status'   => 'Yes',
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $shippingCompany
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    public function createShippingCompanyDriver($data,$sc_id)
    {
        try {
            //Driver
            $role = Role::where('title','Driver')->first();
            $address = Address::create([
                'street'=>$data['userInfo']['street'],
                'city'=>$data['userInfo']['city'],
                'country'=>$data['userInfo']['country'],
                'state'=>$data['userInfo']['state'],
            ]);
            $user = User::create([
                'cnic'      => $data['userInfo']['cnic'],
                'first_name'     => $data['userInfo']['firstName'],
                'last_name'   => $data['userInfo']['lastName'],
                'dob'  => $data['userInfo']['dateOfBirth'],
                'cnic_expiry'  => $data['userInfo']['cnicExpiry'],
                'gender'  => $data['userInfo']['gender'],
                'address_id'  => $address->id,
                'role_id'  => $role->id,
                'phone_number'  => $data['userInfo']['phoneNumber'],
                'email'  => $data['userInfo']['email'],
                'password'  => bcrypt($data['userInfo']['password']),
                'status'  => 'active',
                'profile_picture'  => $data['userInfo']['profilePicture'],
                'qualification'  => $data['userInfo']['qualification'],
            ]);

            $vehicle = Vehicle::create([
                'type'       => $data['vehicleInfo']['type'],
                'registration' => $data['vehicleInfo']['registration'],
                'license_number'    => $data['vehicleInfo']['licenseNumber'],
                'availability_status'   => 'Yes',
                'insurance'   => $data['vehicleInfo']['insurance'],
                'condition'   => $data['vehicleInfo']['condition'],
            ]);

            $driver = Driver::create([
                'user_id'       => $user->id,
                'vehicle_id' => $vehicle->id,
                'shipping_company_id'    => $sc_id,
                'license_number'   => $data['vehicleInfo']['licenseNumber'],
                'availability_status'   => 'Yes',
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $driver
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a shippingCompany
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $shippingCompany = ShippingCompany::find($id);
            if (!$shippingCompany) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $shippingCompany;
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }
    public function GetShippingCompanyDriverData($id)
    {
        try {
            $driver = Driver::with(['vehicle', 'user' => function($query) {
                $query->with('address');
            }])->find($id);
            if (!$driver) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $driver;
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    public function ShippingCompanyRouteData($id)
    {
        try {
            $driver = Order::with(['driver' => function($query) {
                $query->with('user');
            }])->find($id);
            if (!$driver) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $driver;
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a shippingCompany
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $shippingCompany = ShippingCompany::find($id);
            if (!$shippingCompany) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update shippingCompany Data.
            $update = [
                'user_id'       => $data['user_id'],
                'name' => $data['name'],
                'contact_no'    => $data['contact_no'],
                'email'   => $data['email'],
                'contact_person'   => $data['contact_person'],
                'government_clearance'   => $data['government_clearance'],
                'license_number'   => $data['license_number'],
            ];

            $shippingCompany->update($update);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $shippingCompany
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }
    public function UpdateShippingCompanyDriver($data, $id)
    {
        try {
            $driver = Driver::find($id);
            if (!$driver) {
                return [
                    'error' => config('constants.not_found')('driver'),
                ];
            }

            // update driver Data.
            $updateDriver = [
                'license_number'   => $data['vehicleInfo']['licenseNumber'],
                'availability_status'   => $data['vehicleInfo']['availabilityStatus'],
            ];
            $vehicle = Vehicle::find($driver->vehicle_id);
            if (!$vehicle) {
                return [
                    'error' => config('constants.not_found')('vehicle'),
                ];
            }

            // update vehicle Data.
            $updateVehicle = [
                'type'       => $data['vehicleInfo']['type'],
                'registration' => $data['vehicleInfo']['registration'],
                'license_number'    => $data['vehicleInfo']['licenseNumber'],
                'availability_status'   => $data['vehicleInfo']['availabilityStatus'],
                'insurance'   => $data['vehicleInfo']['insurance'],
                'condition'   => $data['vehicleInfo']['condition'],
            ];

            $user = User::find($driver->user_id);
            if (!$user) {
                return [
                    'error' => config('constants.not_found')('user'),
                ];
            }

            // update address Data.
            $updateUser = [
                'cnic'      => $data['userInfo']['cnic'],
                'first_name'     => $data['userInfo']['firstName'],
                'last_name'   => $data['userInfo']['lastName'],
                'dob'  => $data['userInfo']['dateOfBirth'],
                'cnic_expiry'  => $data['userInfo']['cnicExpiry'],
                'gender'  => $data['userInfo']['gender'],
                'phone_number'  => $data['userInfo']['phoneNumber'],
                'email'  => $data['userInfo']['email'],
                'password'  => bcrypt($data['userInfo']['password']),
                'status'  => 'active',
                'profile_picture'  => $data['userInfo']['profilePicture'],
                'qualification'  => $data['userInfo']['qualification'],
            ];
            $address = Address::find($user->address_id);
            if (!$address) {
                return [
                    'error' => config('constants.not_found')('address'),
                ];
            }

            // update address Data.
            $updateAddress = [
                'street'=>$data['userInfo']['street'],
                'city'=>$data['userInfo']['city'],
                'country'=>$data['userInfo']['country'],
                'state'=>$data['userInfo']['state'],
            ];

            $user->update($updateUser);
            $address->update($updateAddress);
            $vehicle->update($updateVehicle);
            $driver->update($updateDriver);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $driver
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    public function AssignDriverToRoute($data, $id)
    {
        try {
            $order = Order::with('driver','driver.user')->find($id);
            if (!$order) {
                return [
                    'error' => config('constants.not_found')('order'),
                ];
            }

            // update driver Data.
            $updateOrder = [
                'driver_id'   => $data['driverId'],
            ];
            $order->update($updateOrder);
            $order = Order::with('driver','driver.user')->find($id);

            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $order
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }
    public function DriverUpdateRouteStatus($data, $id)
    {
        try {
            $order = Order::find($id);
            if (!$order) {
                return [
                    'error' => config('constants.not_found')('route'),
                ];
            }
if ($data['status'] === 'completed'){
    $updateOrder = [
        'status'   => $data['status'],
        'delivery_time'   => Carbon::now(),
    ];
}else{
    $updateOrder = [
        'status'   => $data['status'],
    ];
}

            $order->update($updateOrder);
            $order = Order::with('driver','driver.user')->find($id);

            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $order
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('shippingCompanyUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanyUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a shippingCompany
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $shippingCompany = ShippingCompany::find($id);
            if (!$shippingCompany) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $shippingCompany->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('shippingCompanydelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
