<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AppointmentFormRequest;
use App\Http\Requests\Auth\RegisterFormRequest;
use App\Mail\AppointmentMail;
use App\Models\Role;
use App\Models\User;
use App\Services\Auth\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Mockery\Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Exceptions\ThrottleRequestsException;

class AuthController extends Controller
{
    private $authService;
    protected $auth;
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
        $this->authService = new AuthService();
    }

    public function appointment(AppointmentFormRequest $request) {
        try {
            Mail::to(env('ADMIN_APPOINTMENT_EMAIL'))->send(new AppointmentMail($request->name, $request->email, $request->cnic, $request->phoneNo));
            return $this->ApiResponse("Email For Appointment is Sent",200);
        }catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function register(RegisterFormRequest $request)
    {
        try {

            $data = $this->authService->register($request->all());

            if (isset($data['error'])){
                return $this->ApiResponse($data['error']['message'],$data['error']['status_code']);
            }
            return $this->ApiResponse('success',200,$data);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTrace()], $e->getStatusCode());
        }
    }
    public function updateUser(RegisterFormRequest $request, $id)
    {
        try {
            $data = $this->authService->updateUser($request->all(), $id);

            if (isset($data['error'])){
                return $this->ApiResponse($data['error']['message'],$data['error']['status_code']);
            }
            return $this->ApiResponse('success',200,$data);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage(), 'trace' => $e->getTrace()], $e->getStatusCode());
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
            if (Auth::attempt($credentials, $request->remember)) {
                $user = Auth::user();
                $token = $user->createToken('authToken')->plainTextToken;
                $role = Role::find($user->role_id);
//                if ($user->role_id === 2) {
//                    $type = 'user';
//                } else{
//                    $type = 'Admin';
//                }
                return response()->json([
                    'message' => 'Logged in successfully',
                    'data' => [
                        'data' => $user['first_name'],
                        'token' => $token,
                        'type' => $role->title ?? 'User',
                    ],
                ], 200);
            } else {
                throw ValidationException::withMessages([
                    'email' => ['Invalid credentials'],
                ]);
            }
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (ThrottleRequestsException $e) {
            return response()->json([
                'message' => 'Too many login attempts. Please try again later.',
            ], 429); // 429 Too Many Requests status code
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout()
    {
        try {
            return response()->json([
                'message' => 'User logout successfully.'
            ]);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }
    }

    public function UserListing(Request $request){
        try {
            $view = $request->input('view') ? $request->input('view') : null;
            $page = (int) $request->input('page', 1);

            $query = User::with('role','address');

            // Check if search query is provided
            if ($request->has('search')) {
                $search = $request->input('search');
                // Perform search on relevant fields, adjust as per your User model structure
                $query->where('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            }

            $data = $query->paginate($view, ['*'], 'page', $page);

            return $this->ApiResponse('success', 200, $data);
        } catch (Exception $e) {
            // Handle exception appropriately
        }
    }
    public function deleteUser($id) {
        try {
            $user = User::find($id);
            $user->status = "suspended";
            $user->save();
            return response()->json([
                'message' => 'User Deleted successfully.'
            ]);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }
    }
}
