<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'city' => fake()->city(),
            'package' => fake()->optional()->words(2, true),
            'content' => fake()->paragraph(),
            'avatar' => null,
            'rating' => fake()->numberBetween(1, 5),
            'is_featured' => fake()->boolean(),
            'is_active' => true,
            'sort_order' => 0,
        ];
    }
}
