<?php

use App\Models\GalleryItem;

test('guest can view gallery page', function () {
    $response = $this->get(route('gallery'));

    $response->assertOk();
});

test('gallery page shows only active items', function () {
    GalleryItem::factory()->count(3)->create(['is_active' => true]);
    GalleryItem::factory()->count(2)->create(['is_active' => false]);

    $response = $this->get(route('gallery'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('public/Gallery')
        ->has('gallery', 3)
        ->has('categories')
    );
});

test('gallery page returns dynamic categories', function () {
    GalleryItem::factory()->create(['category' => 'makkah', 'is_active' => true]);
    GalleryItem::factory()->create(['category' => 'makkah', 'is_active' => true]);
    GalleryItem::factory()->create(['category' => 'madinah', 'is_active' => true]);

    $response = $this->get(route('gallery'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('categories', 2)
    );
});

test('gallery page does not include inactive items in categories', function () {
    GalleryItem::factory()->create(['category' => 'makkah', 'is_active' => true]);
    GalleryItem::factory()->create(['category' => 'hotel', 'is_active' => false]);

    $response = $this->get(route('gallery'));

    $response->assertInertia(fn ($page) => $page
        ->has('categories', 1)
    );
});
