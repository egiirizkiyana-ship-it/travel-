<?php

namespace Database\Factories;

use App\Models\GalleryItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class GalleryItemFactory extends Factory
{
    protected $model = GalleryItem::class;

    public function definition(): array
    {
        return [
            'title' => fake()->words(2, true),
            'image' => '/images/gallery/'.fake()->slug().'.jpg',
            'category' => fake()->randomElement(['makkah', 'madinah', 'jamaah', 'hotel', 'transportation', 'other']),
            'sort_order' => 0,
            'is_active' => true,
        ];
    }

    public function active(): static
    {
        return $this->state(fn () => ['is_active' => true]);
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['is_active' => false]);
    }
}
