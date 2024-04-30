<?php

namespace App\Services\CropAuthentication;

use App\Models\CropAuthentication;
use App\Models\DebugLog;
use Carbon\Traits\Date;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class CropAuthenticationService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "CropAuthentication";
    }
    /**
     * Get all CropAuthentication
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function CropAuthenticationList($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $cropAuthentication = CropAuthentication::query()->with('crop','AuthenitactedBy');

            if($search){
                $cropAuthentication = $cropAuthentication->where('id', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $cropAuthentication = $cropAuthentication->where('user_id', $filter);
            }

            if($view){
                $cropAuthentication = $cropAuthentication->paginate($view, ['*'], 'page', $page);
            } else {
                $cropAuthentication = $cropAuthentication->get();
            }

            return $cropAuthentication;
        } catch (QueryException $e) {
            DebugLog::saveLog('cropAuthenticationList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropAuthenticationList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a cropAuthentication
     *
     * @param array $data
     * @return mixed
     */
    public function store($data,$user_id)
    {
        try {
            $cropAuthentication = CropAuthentication::create([
                'farm_id'       => $data['data']['farmId'],
                'crop_id' => $data['data']['cropId'],
                'user_id'    => $user_id,
                'grade_assign'   => $data['data']['grade_assign'] ?? 'No',
                'request_date' => $data['data']['requestDate'],
                'completion_date'   => $data['data']['completion_date'] ?? null ,
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $cropAuthentication
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('cropAuthenticationStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropAuthenticationStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a cropAuthentication
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $cropAuthentication = CropAuthentication::find($id);
            if (!$cropAuthentication) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $cropAuthentication;
        } catch (QueryException $e) {
            DebugLog::saveLog('cropAuthenticationShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropAuthenticationShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a cropAuthentication
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $cropAuthentication = CropAuthentication::find($id);
            if (!$cropAuthentication) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update cropAuthentication Data.
            $update = [
                'farm_id'       => $data['farm_id'],
                'crop_id' => $data['crop_id'],
                'user_id'    => $data['user_id'],
                'grade_assign'   => $data['grade_assign'],
                'request_date'   => $data['request_date'],
                'completion_date'   => $data['completion_date'],
            ];

            $cropAuthentication->update($update);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $cropAuthentication
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('cropAuthenticationUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropAuthenticationUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a cropAuthentication
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $cropAuthentication = CropAuthentication::find($id);
            if (!$cropAuthentication) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $cropAuthentication->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropAuthenticationdelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
