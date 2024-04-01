<?php

namespace App\Http\Requests\Driver;

use Illuminate\Foundation\Http\FormRequest;

class DriverCreateFormRequest extends FormRequest
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
            'user_id' => [
                'integer'
            ],
            'vehicle_id' => [
                'integer',
            ],
            'shipping_company_id' => [
                'integer',
            ],
            'license_number' => [
                'string'
            ],
            'availability_status' => [
                'string'
            ],
        ];
    }
}
