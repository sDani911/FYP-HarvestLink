<?php

namespace App\Services\Order;

use App\Models\Crop;
use App\Models\Order;
use App\Models\DebugLog;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class OrderService
{
    protected $moduleName;

    public function __construct()
    {
        $this->moduleName = "Order";
    }
    /**
     * Get all Order
     *
     * @param null|integer $view
     * @param null|integer $page
     * @param null|integer $search
     * @param null|string  $filter
     * @return mixed
     */
    public function orderlist($view = null, $page = null,$search = null, $filter = null)
    {
        try {
            $order = Order::all();

            if($search){
                $order = $order->where('user_id', 'like', '%' .$search. '%' )
                    ->orderByRaw('CASE
               WHEN id LIKE "'.$search.'%" THEN 1
               WHEN id LIKE "%'.$search.'%" THEN 2
               ELSE 3
               END');
            }
            if($filter){
                $order = $order->where('type', $filter);
            }

            if($view){
                $order = $order->paginate($view, ['*'], 'page', $page);
            } else {
                $order = $order->get();
            }

            return $order;
        } catch (QueryException $e) {
            DebugLog::saveLog('orderList',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('orderList',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Create a order
     *
     * @param array $data
     * @return mixed
     */
    public function store($data)
    {
        try {
            $order = Order::create([
                'user_id'       => $data['user_id'],
                'driver_id' => $data['driver_id'],
                'crop_id'    => $data['crop_id'],
                'manufacture_id'   => $data['manufacture_id'],
                'pickup_time'   => $data['pickup_time'],
                'delivery_time'   => $data['delivery_time'],
                'pickup_location'   => $data['pickup_location'],
                'delivery_location'   => $data['delivery_location'],
                'cost'   => $data['cost'],
            ]);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $order
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('orderStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('orderStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }
    public function buyCropOnMarketplace($data,$user_id)
    {
        try {
            $crop = Crop::with(['farm.address'])->find($data['deliveryAddress']['crop_id']);
            $order = Order::create([
                'user_id'       => $user_id,
                'crop_id'    => $data['deliveryAddress']['crop_id'],
                'delivery_time'   => $data['deliveryAddress']['deliveryDate'],
                'shipping_company_id'   => $data['deliveryAddress']['shippingCompany'],
                'pickup_location'   => $crop->farm->address->street.', '.$crop->farm->address->city.', '.$crop->farm->address->state.', '.$crop->farm->address->country,
                'delivery_location'   => $data['deliveryAddress']['street'].', '.$data['deliveryAddress']['city'].', '.$data['deliveryAddress']['state'].', '.$data['deliveryAddress']['country'],
                'cost'   => $crop->selling_price,
            ]);
            $update = [
                'status'       => "Booked",
            ];

            $crop->update($update);

            return [
                'message' => config('constants.record_created')($this->moduleName),
                'data' => $order
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('orderStore',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('orderStore',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Get a order
     *
     * @param integer $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $order = Order::find($id);
            if (!$order) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            return $order;
        } catch (QueryException $e) {
            DebugLog::saveLog('orderShow',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('orderShow',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Update a order
     *
     * @param array $data
     * @param integer $id
     * @return mixed
     */
    public function update($data, $id)
    {
        try {
            $order = Order::find($id);
            if (!$order) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }

            // update order Data.
            $update = [
                'user_id'       => $data['user_id'],
                'driver_id' => $data['driver_id'],
                'crop_id'    => $data['crop_id'],
                'manufacture_id'   => $data['manufacture_id'],
                'pickup_time'   => $data['pickup_time'],
                'delivery_time'   => $data['delivery_time'],
                'pickup_location'   => $data['pickup_location'],
                'delivery_location'   => $data['delivery_location'],
                'cost'   => $data['cost'],
            ];

            $order->update($update);
            return [
                'message' => config('constants.record_updated')($this->moduleName),
                'data' => $order
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('orderUpdate',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('orderUpdate',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }

    /**
     * Delete a order
     *
     * @param integer $id
     * @return mixed
     */
    public function destroy($id)
    {
        try {
            $order = Order::find($id);
            if (!$order) {
                return [
                    'error' => config('constants.not_found')($this->moduleName),
                ];
            }
            $order->delete();
            return [
                'message' => config('constants.record_deleted')($this->moduleName),
            ];
        } catch (QueryException $e) {
            DebugLog::saveLog('addresdelete',$e->getMessage());
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            DebugLog::saveLog('orderdelete',$e->getMessage());
            return ['error' => config('constants.internal_error')];
        }
    }


}
