<?php

namespace App\Services\Driver;

use App\Models\Driver;
use App\Models\DebugLog;
use App\Models\Order;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class DriverService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "Driver";
    }
    /**
     * Get all Driver
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function driverlist($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $driver = Driver::all();

            if($search){
                $driver = $driver->where('user_id', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $driver = $driver->where('type', $filter);
            }

            if($view){
                $driver = $driver->paginate($view, ['*'], 'page', $page);
            } else {
                $driver = $driver->get();
            }

            return $driver;
        } catch (QueryException $e) {
            DebugLog::saveLog('driverList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('driverList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }
    public function DriverJobs($view = null, $page = null,$search = null, $filter = null,$driverId)
    {
        try {
            $jobs = Order::where('driver_id',$driverId);

            if($search){
                $jobs = $jobs->where('user_id', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $jobs = $jobs->where('type', $filter);
            }

            if($view){
                $jobs = $jobs->paginate($view, ['*'], 'page', $page);
            } else {
                $jobs = $jobs->get();
            }

            return $jobs;
        } catch (QueryException $e) {
            DebugLog::saveLog('driverList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('driverList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a driver
     *
     * @param array $data
     * @return mixed
     */
    public function store($data)
    {
        try {
            $driver = Driver::create([
                'user_id'       => $data['user_id'],
                'vehicle_id' => $data['vehicle_id'],
                'shipping_company_id'    => $data['shipping_company_id'],
                'license_number'   => $data['license_number'],
                'availability_status'   => $data['availability_status'],
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $driver
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('driverStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('driverStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a driver
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $driver = Driver::find($id);
            if (!$driver) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $driver;
        } catch (QueryException $e) {
            DebugLog::saveLog('driverShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('driverShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a driver
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $driver = Driver::find($id);
            if (!$driver) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update driver Data.
            $update = [
                'user_id'       => $data['user_id'],
                'vehicle_id' => $data['vehicle_id'],
                'shipping_company_id'    => $data['shipping_company_id'],
                'license_number'   => $data['license_number'],
                'availability_status'   => $data['availability_status'],
            ];

            $driver->update($update);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $driver
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('driverUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('driverUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a driver
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $driver = Driver::find($id);
            if (!$driver) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $driver->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('driverdelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
