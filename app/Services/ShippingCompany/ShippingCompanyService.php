<?php

namespace App\Services\ShippingCompany;

use App\Models\Address;
use App\Models\Driver;
use App\Models\Role;
use App\Models\ShippingCompany;
use App\Models\DebugLog;
use App\Models\User;
use App\Models\Vehicle;
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
