<?php

namespace App\Http\Requests\Manufacture;

use Illuminate\Foundation\Http\FormRequest;

class ManufactureCreateFormRequest extends FormRequest
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
            'name' => [
                'nullable',
                'string',
            ],
            'contact_no' => [
                'nullable',
                'string',
            ],
            'email' => [
                'nullable',
                'string'
            ],
            'contact_person' => [
                'nullable',
                'string'
            ],'address' => [
                'nullable',
                'string'
            ],'license' => [
                'nullable',
                'string'
            ],'product_quantity' => [
                'nullable',
                'string'
            ],'product_quality' => [
                'nullable',
                'string'
            ],'clearance' => [
                'nullable',
                'string'
            ],
        ];
    }
}
