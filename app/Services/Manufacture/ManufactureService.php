<?php

namespace App\Services\Manufacture;

use App\Models\Manufacture;
use App\Models\DebugLog;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class ManufactureService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "Manufacture";
    }
    /**
     * Get all ManufactureS
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function manufacturelist($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $manufacture = Manufacture::all();

            if($search){
                $manufacture = $manufacture->where('name', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $manufacture = $manufacture->where('type', $filter);
            }

            if($view){
                $manufacture = $manufacture->paginate($view, ['*'], 'page', $page);
            } else {
                $manufacture = $manufacture->get();
            }

            return $manufacture;
        } catch (QueryException $e) {
            DebugLog::saveLog('manufactureList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('manufactureList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a manufacture
     *
     * @param array $data
     * @return mixed
     */
    public function store($data,$user_id)
    {
        try {
            $manufacture = Manufacture::create([
                'user_id'       => $user_id,
                'name' => $data['productInfo']['name'],
                'contact_no'    => $data['contactInfo']['contactNo'],
                'email'   => $data['contactInfo']['email'],
                'contact_person'   => $data['contactInfo']['contactPerson'],
                'address'   => $data['addressInfo']['address'],
                'license'   => $data['productInfo']['license'],
                'product_quantity'   => $data['productInfo']['productQuantity'],
                'product_quality'   => $data['productInfo']['productQuality'],
                'clearance'   => 'No',
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $manufacture
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('manufactureStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('manufactureStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a manufacture
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $manufacture = Manufacture::find($id);
            if (!$manufacture) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $manufacture;
        } catch (QueryException $e) {
            DebugLog::saveLog('manufactureShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('manufactureShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a manufacture
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $manufacture = Manufacture::find($id);
            if (!$manufacture) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update manufacture Data.
            $update = [
                'user_id'       => $data['user_id'],
                'name' => $data['name'],
                'contact_no'    => $data['contact_no'],
                'email'   => $data['email'],
                'contact_person'   => $data['contact_person'],
                'address'   => $data['address'],
                'license'   => $data['license'],
                'product_quantity'   => $data['product_quantity'],
                'product_quality'   => $data['product_quality'],
                'clearance'   => $data['clearance'],
            ];

            $manufacture->update($update);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $manufacture
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('manufactureUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('manufactureUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a manufacture
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $manufacture = Manufacture::find($id);
            if (!$manufacture) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $manufacture->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('manufacturedelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
