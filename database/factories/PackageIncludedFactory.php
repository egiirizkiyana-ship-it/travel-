<?php

namespace Database\Factories;

use App\Models\PackageIncluded;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PackageIncluded>
 */
class PackageIncludedFactory extends Factory
{
    protected $model = PackageIncluded::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'package_id' => null,
            'item' => fake()->sentence(3),
            'sort_order' => 0,
        ];
    }
}
