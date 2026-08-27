<?php

use App\Models\User;

test('unauthenticated admin access returns 403 or redirects to login', function () {
    $response = $this->get('/admin');

    $response->assertStatus(302);
    $response->assertRedirect('/login');
});

test('non-admin user cannot access admin', function () {
    $user = User::factory()->create(['role' => 'user']);

    $response = $this->actingAs($user)->get('/admin');

    $response->assertStatus(403);
});

test('404 page returns correct status via inertia', function () {
    $response = $this->get('/nonexistent-page', ['X-Inertia' => 'true']);

    $response->assertStatus(404);
});
