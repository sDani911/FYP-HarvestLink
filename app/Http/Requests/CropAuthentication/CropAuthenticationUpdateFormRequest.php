<?php

namespace App\Http\Requests\CropAuthentication;

use Illuminate\Foundation\Http\FormRequest;

class CropAuthenticationUpdateFormRequest extends FormRequest
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
            'farm_id' => [
                'integer'
            ],
            'crop_id' => [
                'integer',
            ],
            'user_id' => [
                'integer',
            ],
            'grade_assign' => [
                'string'
            ],
            'request_date' => [
                'string'
            ],'completion_date' => [
                'string'
            ],
        ];
    }
}
