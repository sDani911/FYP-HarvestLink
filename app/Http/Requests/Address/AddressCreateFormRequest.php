<?php

namespace App\Http\Requests\Address;

use Illuminate\Foundation\Http\FormRequest;

class AddressCreateFormRequest extends FormRequest
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
            'country' => [
                'required',
                'string'
            ],
            'state' => [
                'required',
                'string'
            ],
            'city' => [
                'required',
                'string'
            ],
            'street' => [
                'required',
                'string'
            ]
        ];
    }
}
