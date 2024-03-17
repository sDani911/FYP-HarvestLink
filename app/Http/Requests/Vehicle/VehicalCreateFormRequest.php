<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class VehicleCreateFormRequest extends FormRequest
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
            'type' => [
                'required',
                'string'
            ],
            'registration' => [
                'required',
                'string',
            ],
            'license_number' => [
                'required',
                'string',
            ],
            'availability_status' => [
                'nullable',
                'string'
            ],
            'insurance' => [
                'nullable',
                'string'
            ],'condition' => [
                'nullable',
                'string'
            ],
        ];
    }
}
