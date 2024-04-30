<?php

namespace App\Services\Address;

use App\Models\Address;
use App\Models\DebugLog;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class AddressService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "Address";
    }
    /**
     * Get all Address
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function addresslist($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $address = Address::all();

            if($search){
                $address = $address->where('country', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $address = $address->where('type', $filter);
            }

            if($view){
                $address = $address->paginate($view, ['*'], 'page', $page);
            } else {
                $address = $address->get();
            }

            return $address;
        } catch (QueryException $e) {
            DebugLog::saveLog('addressList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('addressList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a address
     *
     * @param array $data
     * @return mixed
     */
    public function store($data)
    {
        try {
            $address = Address::create([
                'country'       => $data['country'],
                'state' => $data['state'],
                'city'    => $data['city'],
                'street'   => $data['street'],
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $address
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addressStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('addressStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a address
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $address = Address::find($id);
            if (!$address) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $address;
        } catch (QueryException $e) {
            DebugLog::saveLog('addressShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('addressShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a address
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $address = Address::find($id);
            if (!$address) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update address Data.
            $update = [
                'country'       => $data['country'],
                'state' => $data['state'],
                'city'    => $data['city'],
                'street'   => $data['street'],
            ];

            $address->update($update);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $address
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addressUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('addressUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a address
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $address = Address::find($id);
            if (!$address) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $address->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('addressdelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
