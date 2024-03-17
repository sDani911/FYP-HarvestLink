<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Address\AddressCreateFormRequest;
use App\Http\Requests\Address\AddressUpdateFormRequest;
use App\Services\Address\AddressService;
use Exception;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    protected $AddressService;
    protected $auth;

    public function __construct(AddressService $AddressService)
    {
        $this->auth = Auth::user();

        $this->AddressService = $AddressService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $view = $request->input('view') ?$request->input('view'): null;
            $page = (int)request()->page ?? 1;
            $search = request()->search ? request()->search : null;
            $groupBy = request()->groupBy ? request()->groupBy : null;
            $data = $this->AddressService->AddressList($view,$page,$search,$groupBy);
            if (isset($data['error'])){
                return ApiResponse($data['error']['message'],$data['error']['status_code']);
            }
            return ApiResponse('success',200,$data);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (Exception $e) {
            if (config('app.debug')) {
                return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTrace()], 500);
            }
            return response()->json(['message' => __('response.catch')], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddressCreateFormRequest $request)
    {
        try {
            $data = $this->AddressService->store($request->all());
            if (isset($data['error'])){
                return ApiResponse($data['error']['message'],$data['error']['status_code']);
            }
            return ApiResponse($data['message']['message'],$data['message']['status_code'],$data);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (Exception $e) {
            if (config('app.debug')) {
                return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTrace()], 500);
            }
            return response()->json(['message' => __('response.catch')], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $data = $this->AddressService->show((int)$id);
            if (isset($data['error'])){
                return ApiResponse($data['error']['message'],$data['error']['status_code']);
            }
            return ApiResponse("success",200,$data);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (Exception $e) {
            if (config('app.debug')) {
                return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTrace()], 500);
            }
            return response()->json(['message' => __('response.catch')], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $data = $this->AddressService->getEditData((int)$id);
            if (isset($data['error'])){
                return ApiResponse($data['error']['message'],$data['error']['status_code']);
            }
            return ApiResponse("success",200,$data);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (Exception $e) {
            if (config('app.debug')) {
                return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTrace()], 500);
            }
            return response()->json(['message' => __('response.catch')], 500);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(AddressUpdateFormRequest $request, $id)
    {
        try {
            $data = $this->AddressService->update($request->all(), (int)$id);
            if (isset($data['error'])){
                return ApiResponse($data['error']['message'],$data['error']['status_code']);
            }
            return ApiResponse($data['message']['message'],$data['message']['status_code'],$data);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (Exception $e) {
            if (config('app.debug')) {
                return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTrace()], 500);
            }
            return response()->json(['message' => __('response.catch')], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $data = $this->AddressService->destroy((int)$id);
            if (isset($data['error'])){
                return ApiResponse($data['error']['message'],$data['error']['status_code']);
            }
            return ApiResponse($data['message']['message'],$data['message']['status_code'],$data);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (Exception $e) {
            if (config('app.debug')) {
                return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTrace()], 500);
            }
            return response()->json(['message' => __('response.catch')], 500);
        }
    }
}
