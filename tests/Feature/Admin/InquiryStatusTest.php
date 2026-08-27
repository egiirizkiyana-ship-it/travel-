<?php

use App\Models\Inquiry;
use App\Models\User;

test('admin can view inquiries list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->get(route('admin.inquiries.index'));
    $response->assertOk();
});

test('admin can view inquiry detail', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $inquiry = Inquiry::factory()->create();

    $response = $this->get(route('admin.inquiries.show', $inquiry));
    $response->assertOk();
});

test('admin can update inquiry status', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $inquiry = Inquiry::factory()->create(['status' => 'new']);

    $response = $this->patch(route('admin.inquiries.status', $inquiry), [
        'status' => 'contacted',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('inquiries', ['id' => $inquiry->id, 'status' => 'contacted']);
});
