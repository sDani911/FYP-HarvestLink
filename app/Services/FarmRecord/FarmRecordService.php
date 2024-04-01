<?php

namespace App\Services\FarmRecord;

use App\Models\Address;
use App\Models\Crop;
use App\Models\FarmRecord;
use App\Models\DebugLog;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class FarmRecordService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "FarmRecord";
    }
    /**
     * Get all FarmRecord
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function farmRecordlist($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $farmRecord = FarmRecord::query();

            if($search){
                $farmRecord = $farmRecord->where('name', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $farmRecord = $farmRecord->where('type', $filter);
            }

            if($view){
                $farmRecord = $farmRecord->paginate($view, ['*'], 'page', $page);
            } else {
                $farmRecord = $farmRecord->get();
            }

            return $farmRecord;
        } catch (QueryException $e) {
            DebugLog::saveLog('farmRecordList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('farmRecordList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a farmRecord
     *
     * @param array $data
     * @return mixed
     */
    public function store($data,$user_id)
    {
        try {
            $address = Address::create([
                'street'=>$data['farmInfo']['street'],
                'city'=>$data['farmInfo']['city'],
                'country'=>$data['farmInfo']['country'],
                'state'=>$data['farmInfo']['state'],
            ]);
            $farmRecord = FarmRecord::create([
                'user_id'       => $user_id,
                'name' => $data['farmInfo']['name'],
                'address_id'    => $address->id,
                'size'   => $data['farmInfo']['size'],
                'date_of_establishment'   => $data['farmInfo']['dateOfEstablishment'],
                'climate_zone'   => $data['farmInfo']['climateZone'],
            ]);
            $crop = Crop::create([
                'name'       => $data['cropInfo']['name'],
                'user_id'       => $user_id,
                'type' => $data['cropInfo']['type'],
                'quantity'    => $data['cropInfo']['quantity'],
                'unit'    => $data['cropInfo']['unit'],
                'start_date'   => $data['cropInfo']['startDate'],
                'end_date'   => $data['cropInfo']['endDate'],
                'seed_price'   => $data['cropInfo']['seedPrice'],
                'fertilizer_price'   => $data['fertilizerInfo']['fertilizerPrice'],
                'fertilizer_name'   => $data['fertilizerInfo']['fertilizerName'],
                'fertilizer_quantity'   => $data['fertilizerInfo']['fertilizerQuantity'],
                'fertilizer_quantity_unit'   => $data['fertilizerInfo']['fertilizerQuantityUnit'],
                'pesticide_name'   => $data['fertilizerInfo']['pesticideName'],
                'pesticide_price'   => $data['fertilizerInfo']['pesticidePrice'],
                'status'   => $data['cropInfo']['status'] ?? 'Harvesting',
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $farmRecord
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('farmRecordStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('farmRecordStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a farmRecord
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $farmRecord = FarmRecord::find($id);
            if (!$farmRecord) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $farmRecord;
        } catch (QueryException $e) {
            DebugLog::saveLog('farmRecordShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('farmRecordShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a farmRecord
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $farmRecord = FarmRecord::find($id);
            if (!$farmRecord) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update farmRecord Data.
            $update = [
                'user_id'       => $data['user_id'],
                'name' => $data['name'],
                'address_id'    => $data['address_id'],
                'size'   => $data['size'],
                'date_of_establishment'   => $data['date_of_establishment'],
                'climate_zone'   => $data['climate_zone'],
            ];

            $farmRecord->update($update);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $farmRecord
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('farmRecordUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('farmRecordUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a farmRecord
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $farmRecord = FarmRecord::find($id);
            if (!$farmRecord) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $farmRecord->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('farmRecorddelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
