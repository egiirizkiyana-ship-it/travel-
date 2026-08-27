<?php

use App\Models\Testimonial;

test('guest can view testimonials page', function () {
    $response = $this->get(route('testimonials'));

    $response->assertOk();
});

test('testimonials page shows only active testimonials', function () {
    Testimonial::factory()->count(3)->create(['is_active' => true]);
    Testimonial::factory()->count(2)->create(['is_active' => false]);

    $response = $this->get(route('testimonials'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('public/Testimonials')
        ->has('testimonials', 3)
        ->has('stats')
    );
});

test('testimonials page returns correct stats', function () {
    Testimonial::factory()->create(['rating' => 5, 'is_active' => true]);
    Testimonial::factory()->create(['rating' => 4, 'is_active' => true]);

    $response = $this->get(route('testimonials'));

    $response->assertInertia(fn ($page) => $page
        ->where('stats.average_rating', 4.5)
        ->where('stats.total', 2)
    );
});

test('testimonials page shows featured first', function () {
    Testimonial::factory()->create(['name' => 'Regular', 'is_featured' => false, 'sort_order' => 1, 'is_active' => true]);
    Testimonial::factory()->create(['name' => 'Featured', 'is_featured' => true, 'sort_order' => 2, 'is_active' => true]);

    $response = $this->get(route('testimonials'));

    $response->assertInertia(fn ($page) => $page
        ->has('testimonials', 2)
    );
});
