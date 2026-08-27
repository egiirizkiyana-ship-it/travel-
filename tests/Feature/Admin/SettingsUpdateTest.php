<?php

use App\Models\AboutSection;
use App\Models\User;

test('admin can view about edit page', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->get(route('admin.content.about'));
    $response->assertOk();
});

test('admin can update about section', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    AboutSection::firstOrCreate([], [
        'eyebrow' => 'Old Eyebrow',
        'title' => 'Old Title',
        'description' => 'Old Description',
        'is_active' => true,
    ]);

    $response = $this->put(route('admin.content.about.update'), [
        'eyebrow' => 'New Eyebrow',
        'title' => 'New Title',
        'description' => 'New Description',
        'image' => '',
        'button_text' => '',
        'button_url' => '',
        'is_active' => true,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('about_sections', [
        'eyebrow' => 'New Eyebrow',
        'title' => 'New Title',
    ]);
});
