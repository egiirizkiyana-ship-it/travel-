<?php

use App\Models\User;

test('admin can store testimonial with empty avatar', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->post(route('admin.testimonials.store'), [
        'name' => 'Ahmad',
        'city' => 'Jakarta',
        'package' => '',
        'content' => 'Pelayanan sangat baik',
        'avatar' => '',
        'rating' => 5,
        'is_featured' => false,
        'is_active' => true,
        'sort_order' => 0,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('testimonials', ['name' => 'Ahmad']);
});

test('admin can store testimonial with avatar path', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->post(route('admin.testimonials.store'), [
        'name' => 'Budi',
        'city' => 'Bandung',
        'package' => 'Umroh Reguler',
        'content' => 'Sangat memuaskan',
        'avatar' => '/images/testimonials/testimonial-abc123.png',
        'rating' => 4,
        'is_featured' => true,
        'is_active' => true,
        'sort_order' => 1,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('testimonials', ['name' => 'Budi', 'avatar' => '/images/testimonials/testimonial-abc123.png']);
});
