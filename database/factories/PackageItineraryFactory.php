<?php

namespace Database\Factories;

use App\Models\PackageItinerary;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PackageItinerary>
 */
class PackageItineraryFactory extends Factory
{
    protected $model = PackageItinerary::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'package_id' => null,
            'day_number' => fake()->numberBetween(1, 14),
            'title' => fake()->sentence(3),
            'location' => fake()->city(),
            'description' => fake()->paragraph(),
            'sort_order' => 0,
        ];
    }
}
