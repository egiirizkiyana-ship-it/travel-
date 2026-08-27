<?php

use App\Models\Testimonial;
use App\Models\User;

test('admin can view testimonials list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->get(route('admin.testimonials.index'));
    $response->assertOk();
});

test('admin can create testimonial', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->post(route('admin.testimonials.store'), [
        'name' => 'Ahmad',
        'city' => 'Jakarta',
        'package' => 'Umroh Premium',
        'content' => 'Pelayanan sangat baik',
        'rating' => 5,
        'is_featured' => true,
        'is_active' => true,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('testimonials', ['name' => 'Ahmad']);
});

test('admin can update testimonial', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $testimonial = Testimonial::factory()->create(['name' => 'Old Name']);

    $response = $this->put(route('admin.testimonials.update', $testimonial), [
        'name' => 'New Name',
        'city' => $testimonial->city,
        'content' => $testimonial->content,
        'rating' => $testimonial->rating,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('testimonials', ['id' => $testimonial->id, 'name' => 'New Name']);
});
