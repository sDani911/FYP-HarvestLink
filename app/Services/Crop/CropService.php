<?php

namespace App\Services\Crop;

use App\Models\Crop;
use App\Models\DebugLog;
use App\Traits\ImageUpload;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class CropService
{
    use ImageUpload;

    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "Crop";
    }
    /**
     * Get all Crop
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function croplist($view = null, $page = null,$search = null, $filter = null, $applyInspection = null)
    {
        try {
            $crop = Crop::query();

            if($search){
                $crop = $crop->where('name', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $crop = $crop->where('user_id', $filter);
            }
            if($applyInspection){
                $crop = $crop->doesntHave('cropAuthentications');
            }

            if($view){
                $crop = $crop->paginate($view, ['*'], 'page', $page);
            } else {
                $crop = $crop->get();
            }

            return $crop;
        } catch (QueryException $e) {
            DebugLog::saveLog('cropList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    public function MarketplaceCropData($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $crop = Crop::query()->where('status','OnMarketPlace');

            if($search){
                $crop = $crop->where('name', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }

            if ($view) {
                $crop = $crop->with(['farm.address'])->paginate($view, ['*'], 'page', $page);
            } else {
                $crop = $crop->with(['farm.address'])->get();
            }
            $crop = $this->ImagesUrl($crop,'crop');

            return $crop;
        } catch (QueryException $e) {
            DebugLog::saveLog('cropList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a crop
     *
     * @param array $data
     * @return mixed
     */
    public function store($data)
    {
        try {
            $crop = Crop::create([
                'name'       => $data['name'],
                'type' => $data['type'],
                'quantity'    => $data['quantity'],
                'start_date'   => $data['start_date'],
                'end_date'   => $data['end_date'],
                'seed_price'   => $data['seed_price'],
                'fertilizer_price'   => $data['fertilizer_price'],
                'fertilizer_name'   => $data['fertilizer_name'],
                'fertilizer_quantity'   => $data['fertilizer_quantity'],
                'pesticide_name'   => $data['pesticide_name'],
                'pesticide_price'   => $data['pesticide_price'],
                'fertilizer_quantity_unit'   => $data['fertilizerQuantityUnit'],
                'unit'                   => $data['unit'],
                'status'                      => $data['status'] ?? 'Harvesting',
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $crop
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('cropStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a crop
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $crop = Crop::find($id);
            if (!$crop) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $crop;
        } catch (QueryException $e) {
            DebugLog::saveLog('cropShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a crop
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $crop = Crop::find($id);
            if (!$crop) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update crop Data.
            $update = [
                'status'       => "OnMarketPlace",
                'selling_price' => $data['sellingPrice'],
                'description'    => $data['description'],
            ];

            $crop->update($update);
            $this->imageUpload($data['images'], 'crop', 'crop', $crop->id, $crop->user_id);

            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $crop
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('cropUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a crop
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $crop = Crop::find($id);
            if (!$crop) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $crop->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('cropdelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
