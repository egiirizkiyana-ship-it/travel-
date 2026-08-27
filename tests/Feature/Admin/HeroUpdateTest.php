<?php

use App\Models\HeroSection;
use App\Models\User;

test('admin can view hero edit page', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->get(route('admin.content.hero'));
    $response->assertOk();
});

test('admin can update hero', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    HeroSection::firstOrCreate([], [
        'eyebrow' => 'Old Eyebrow',
        'title' => 'Old Title',
        'description' => 'Old Description',
        'is_active' => true,
    ]);

    $response = $this->put(route('admin.content.hero.update'), [
        'eyebrow' => 'New Eyebrow',
        'title' => 'New Title',
        'description' => 'New Description',
        'primary_button_text' => 'Hubungi Kami',
        'primary_button_url' => '/contact',
        'secondary_button_text' => 'Lihat Paket',
        'secondary_button_url' => '/packages',
        'background_image' => '',
        'is_active' => true,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('hero_sections', [
        'eyebrow' => 'New Eyebrow',
        'title' => 'New Title',
    ]);
});
