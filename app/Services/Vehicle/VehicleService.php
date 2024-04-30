<?php

namespace App\Services\Vehicle;

use App\Models\Vehicle;
use App\Models\DebugLog;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class VehicleService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "Vehicle";
    }
    /**
     * Get all Vehicle
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function vehiclelist($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $vehicle = Vehicle::all();

            if($search){
                $vehicle = $vehicle->where('license_number', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $vehicle = $vehicle->where('type', $filter);
            }

            if($view){
                $vehicle = $vehicle->paginate($view, ['*'], 'page', $page);
            } else {
                $vehicle = $vehicle->get();
            }

            return $vehicle;
        } catch (QueryException $e) {
            DebugLog::saveLog('vehicleList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('vehicleList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a vehicle
     *
     * @param array $data
     * @return mixed
     */
    public function store($data)
    {
        try {
            $vehicle = Vehicle::create([
                'type'       => $data['type'],
                'registration' => $data['registration'],
                'license_number'    => $data['license_number'],
                'availability_status'   => $data['availability_status'],
                'insurance'   => $data['insurance'],
                'condition'   => $data['condition'],
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $vehicle
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('vehicleStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('vehicleStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a vehicle
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $vehicle = Vehicle::find($id);
            if (!$vehicle) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $vehicle;
        } catch (QueryException $e) {
            DebugLog::saveLog('vehicleShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('vehicleShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a vehicle
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $vehicle = Vehicle::find($id);
            if (!$vehicle) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update vehicle Data.
            $update = [
                'type'       => $data['type'],
                'registration' => $data['registration'],
                'license_number'    => $data['license_number'],
                'availability_status'   => $data['availability_status'],
                'insurance'   => $data['insurance'],
                'condition'   => $data['condition'],
            ];

            $vehicle->update($update);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $vehicle
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('vehicleUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('vehicleUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a vehicle
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $vehicle = Vehicle::find($id);
            if (!$vehicle) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $vehicle->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('vehicledelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
