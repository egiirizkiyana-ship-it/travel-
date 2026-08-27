<?php

namespace Database\Factories;

use App\Models\PackageNotIncluded;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PackageNotIncluded>
 */
class PackageNotIncludedFactory extends Factory
{
    protected $model = PackageNotIncluded::class;

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
