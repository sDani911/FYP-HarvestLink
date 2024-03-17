<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class OrderUpdateFormRequest extends FormRequest
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
                'integer',
            ],
            'driver_id' => [
                'required',
                'integer',
            ],
            'crop_id' => [
                'required',
                'integer',
            ],
            'manufacture_id' => [
                'required',
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
                'required',
                'integer',
            ]
        ];
    }
}
