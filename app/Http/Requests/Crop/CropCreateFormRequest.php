<?php

namespace App\Http\Requests\Crop;

use Illuminate\Foundation\Http\FormRequest;

class CropCreateFormRequest extends FormRequest
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
            'farmInfo.name' => [
                'string'
            ],
            'farmInfo.type' => [
                'string',
            ],
            'farmInfo.quantity' => [
                'integer',
            ],
            'farmInfo.startDate' => [
                'string'
            ],
            'farmInfo.endDate' => [
                'string',
            ],
            'farmInfo.seedPrice' => [
                'integer',
            ],
            'fertilizerInfo.fertilizerPrice' => [
                'integer'
            ],
            'fertilizerInfo.fertilizerName' => [
                'string',
            ],
            'fertilizerInfo.fertilizerQuantity' => [
                'integer',
            ],
            'fertilizerInfo.pesticideName' => [
                'string'
            ],
            'fertilizerInfo.pesticidePrice' => [
                'integer'
            ],
        ];
    }
}
