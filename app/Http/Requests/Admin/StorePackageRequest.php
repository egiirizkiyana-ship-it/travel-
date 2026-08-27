<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => ['required', 'string', 'max:255', Rule::unique('packages', 'slug')],
            'duration' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string|max:500',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'departure_city' => 'nullable|string|max:255',
            'airline' => 'nullable|string|max:255',
            'hotel_madinah' => 'nullable|string|max:255',
            'hotel_madinah_distance' => 'nullable|string|max:255',
            'hotel_madinah_room' => 'nullable|string|max:255',
            'hotel_makkah' => 'nullable|string|max:255',
            'hotel_makkah_distance' => 'nullable|string|max:255',
            'hotel_makkah_room' => 'nullable|string|max:255',
            'flight_notes' => 'nullable|string|max:500',
            'facilities' => 'nullable|array',
            'facilities.*.name' => 'required_with:facilities|string|max:255',
            'facilities.*.description' => 'nullable|string|max:255',
            'facilities.*.icon' => 'nullable|string|max:255',
            'facilities.*.sort_order' => 'nullable|integer|min:0',
            'facilities.*.is_active' => 'boolean',
            'itineraries' => 'nullable|array',
            'itineraries.*.day_number' => 'required_with:itineraries|integer|min:1',
            'itineraries.*.title' => 'required_with:itineraries|string|max:255',
            'itineraries.*.location' => 'nullable|string|max:255',
            'itineraries.*.description' => 'nullable|string',
            'itineraries.*.sort_order' => 'nullable|integer|min:0',
            'included' => 'nullable|array',
            'included.*.item' => 'required_with:included|string|max:255',
            'included.*.sort_order' => 'nullable|integer|min:0',
            'not_included' => 'nullable|array',
            'not_included.*.item' => 'required_with:not_included|string|max:255',
            'not_included.*.sort_order' => 'nullable|integer|min:0',
        ];
    }
}
