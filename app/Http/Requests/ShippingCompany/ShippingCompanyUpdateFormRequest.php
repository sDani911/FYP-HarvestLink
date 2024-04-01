<?php

namespace App\Http\Requests\ShippingCompany;

use Illuminate\Foundation\Http\FormRequest;

class ShippingCompanyUpdateFormRequest extends FormRequest
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
                'required',
                'integer'
            ],
            'name' => [
                'required',
                'string',
            ],
            'contact_no' => [
                'required',
                'string',
            ],
            'email' => [
                'nullable',
                'string'
            ],
            'contact_person' => [
                'nullable',
                'string'
            ],'government_clearance' => [
                'nullable',
                'string'
            ],'license_number' => [
                'nullable',
                'string'
            ]
        ];
    }
}
