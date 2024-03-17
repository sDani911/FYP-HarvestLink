<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CropAuthenticationController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\FarmRecordController;
use App\Http\Controllers\ManufactureController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ShippingCompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('appointment', [AuthController::class, 'appointment']);
//Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);

    //Admin
    Route::post('createUser',[AuthController::class,'register']);

    //Farmer
    Route::post('createFarm',[FarmRecordController::class,'store']);
    Route::get('farmerInspectionData',[CropAuthenticationController::class,'index']);
    //Crop
    Route::get('crop/{id}',[CropController::class,'show']);
    Route::get('farmerCropData',[CropController::class,'index']);
    Route::get('farmerFarmData',[FarmRecordController::class,'index']);
    Route::post('createCropAuthentication',[CropAuthenticationController::class,'store']);

    //Manufacture
    Route::post('createManufacture',[ManufactureController::class,'store']);

    //ShippingCompany
    Route::post('createShippingCompany',[ShippingCompanyController::class,'store']);
    Route::get('ShippingCompany',[ShippingCompanyController::class,'index']);

    //Marketplace
    Route::post('placeCropOnMarketPlace/{id}',[CropController::class,'update']);
    Route::get('MarketplaceCropData',[CropController::class,'MarketplaceCropData']);

    //Order
    Route::post('buyCropOnMarketplace',[OrderController::class,'buyCropOnMarketplace']);


});
