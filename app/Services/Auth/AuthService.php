<?php

namespace App\Services\Auth;

use App\Models\Address;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthService
{
    public function __construct()
    {
        $this->moduleName = "Auth";
    }
    public function register($data)
    {
        try{
            $role = Role::where('title',$data['roleInfo']['selectedRole'])->first();
            $address = Address::create([
                'street'=>$data['addressInfo']['street'],
                'city'=>$data['addressInfo']['city'],
                'country'=>$data['addressInfo']['country'],
                'state'=>$data['addressInfo']['state'],
            ]);
        $user = User::create([
            'cnic'      => $data['personalInfo']['cnic'],
            'first_name'     => $data['personalInfo']['firstName'],
            'last_name'   => $data['personalInfo']['lastName'],
            'dob'  => $data['personalInfo']['dateOfBirth'],
            'cnic_expiry'  => $data['personalInfo']['cnicExpiry'],
            'gender'  => $data['personalInfo']['gender'],
            'address_id'  => $address->id,
            'role_id'  => $role->id,
            'phone_number'  => $data['contactInfo']['phoneNumber'],
            'email'  => $data['contactInfo']['email'],
            'password'  => bcrypt($data['contactInfo']['password']),
            'status'  => 'active',
            'profile_picture'  => $data['personalInfo']['profilePicture'],
            'qualification'  => $data['personalInfo']['qualification'],
        ]);


        return ['data' => 'success'];
        } catch (QueryException $e) {
            // Handle the database query exception here, log it or return an error response
            return ['error' => config('constants.query_error')($this->moduleName,$e->getMessage())];
        } catch (\Exception $e) {
            // Handle other exceptions
            dd($e->getMessage().' '.$e->getLine());
            return ['error' => config('constants.internal_error')];
        }
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
    }
}
