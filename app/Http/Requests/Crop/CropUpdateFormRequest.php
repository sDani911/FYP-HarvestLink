<?php

namespace App\Http\Requests\Crop;

use Illuminate\Foundation\Http\FormRequest;

class CropUpdateFormRequest extends FormRequest
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
                'string'
            ],
            'type' => [
                'string',
            ],
            'quantity' => [
                'integer',
            ],
            'start_date' => [
                'string'
            ],
            'end_date' => [
                'string',
            ],
            'seed_price' => [
                'integer',
            ],
            'fertilizer_price' => [
                'integer'
            ],
            'fertilizer_name' => [
                'string',
            ],
            'fertilizer_quantity' => [
                'integer',
            ],
            'pesticide_name' => [
                'string'
            ],
            'pesticide_price' => [
                'integer'
            ],
        ];
    }
}
