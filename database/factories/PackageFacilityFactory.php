<?php

namespace Database\Factories;

use App\Models\PackageFacility;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PackageFacility>
 */
class PackageFacilityFactory extends Factory
{
    protected $model = PackageFacility::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'package_id' => null,
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'icon' => null,
            'sort_order' => 0,
            'is_active' => true,
        ];
    }
}
