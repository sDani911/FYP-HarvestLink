<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'addressInfo' => [
                'required'
            ],
            'contactInfo' => [
                'required'
            ],
            'personalInfo' => [
                'required'
            ],
            'roleInfo' => [
                'required'
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'addressInfo.required'     => 'The addressInfo  field is required.',
            'contactInfo.required'        => 'The contactInfo field is required.',
            'personalInfo.required'     => 'The personalInfo field is required.',
            'roleInfo.required'     => 'The role field is required.',
        ];
    }
}
