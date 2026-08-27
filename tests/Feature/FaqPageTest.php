<?php

use App\Models\Faq;

test('guest can view faq page', function () {
    $response = $this->get(route('faq'));

    $response->assertOk();
});

test('faq page shows only active faqs', function () {
    Faq::factory()->count(3)->active()->create();
    Faq::factory()->count(2)->create(['is_active' => false]);

    $response = $this->get(route('faq'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('public/Faq')
        ->has('faqs', 3)
        ->has('seo')
    );
});

test('faq page includes structured data', function () {
    Faq::factory()->create([
        'question' => 'Bagaimana cara mendaftar?',
        'answer' => 'Silakan hubungi kami.',
        'is_active' => true,
    ]);

    $response = $this->get(route('faq'));

    $response->assertInertia(fn ($page) => $page
        ->has('structuredData')
        ->where('structuredData.@type', 'FAQPage')
    );
});

test('faq page has null structured data when no faqs', function () {
    $response = $this->get(route('faq'));

    $response->assertInertia(fn ($page) => $page
        ->where('structuredData', null)
    );
});
