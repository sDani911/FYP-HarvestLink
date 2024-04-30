<?php

namespace App\Http\Requests\FarmRecord;

use Illuminate\Foundation\Http\FormRequest;

class FarmRecordCreateFormRequest extends FormRequest
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
            'address_id' => [
                'required',
                'integer',
            ],
            'size' => [
                'nullable',
                'string'
            ],
            'date_of_establishment' => [
                'nullable',
                'string'
            ],'climate_zone' => [
                'nullable',
                'string'
            ],
        ];
    }
}
