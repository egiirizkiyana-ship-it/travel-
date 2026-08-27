<?php

use App\Models\Faq;
use App\Models\User;

test('admin can view faqs list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->get(route('admin.faqs.index'));
    $response->assertOk();
});

test('admin can create faq', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->post(route('admin.faqs.store'), [
        'question' => 'Bagaimana cara mendaftar?',
        'answer' => 'Silakan hubungi kami via WhatsApp',
        'sort_order' => 0,
        'is_active' => true,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('faqs', ['question' => 'Bagaimana cara mendaftar?']);
});

test('admin can update faq', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $faq = Faq::factory()->create(['question' => 'Old Question']);

    $response = $this->put(route('admin.faqs.update', $faq), [
        'question' => 'New Question',
        'answer' => $faq->answer,
        'sort_order' => $faq->sort_order,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('faqs', ['id' => $faq->id, 'question' => 'New Question']);
});

test('admin can delete faq', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $faq = Faq::factory()->create();

    $response = $this->delete(route('admin.faqs.destroy', $faq));
    $response->assertRedirect();
    $this->assertDatabaseMissing('faqs', ['id' => $faq->id]);
});
