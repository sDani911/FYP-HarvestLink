<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class OrderCreateFormRequest extends FormRequest
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
            'driver_id' => [
                'nullable',
                'integer',
            ],
            'crop_id' => [
                'nullable',
                'integer',
            ],
            'manufacture_id' => [
                'nullable',
                'integer',
            ],
            'pickup_time' => [
                'nullable',
                'string'
            ],'delivery_time' => [
                'nullable',
                'string'
            ],'pickup_location' => [
                'nullable',
                'string'
            ],'delivery_location' => [
                'nullable',
                'string'
            ],'cost' => [
                'nullable',
                'integer',
            ]
        ];
    }
}
