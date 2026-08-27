<?php

use App\Models\Package;
use App\Models\WebsiteSetting;

test('guest can view contact page', function () {
    $response = $this->get(route('contact'));

    $response->assertOk();
});

test('contact page shows website settings', function () {
    WebsiteSetting::create(['key' => 'company_name', 'value' => 'Havana Travel']);
    WebsiteSetting::create(['key' => 'phone', 'value' => '+62 21 1234 5678']);
    WebsiteSetting::create(['key' => 'whatsapp', 'value' => '+62 812 3456 7890']);
    WebsiteSetting::create(['key' => 'email', 'value' => 'info@example.com']);
    WebsiteSetting::create(['key' => 'address', 'value' => 'Jl. Sudirman No. 123']);

    $response = $this->get(route('contact'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('public/Contact')
        ->has('settings')
        ->has('packages')
    );
});

test('contact page shows active packages in select', function () {
    Package::factory()->count(3)->active()->create();
    Package::factory()->count(2)->create(['is_active' => false]);

    $response = $this->get(route('contact'));

    $response->assertInertia(fn ($page) => $page
        ->has('packages', 3)
    );
});

test('valid inquiry is stored', function () {
    $package = Package::factory()->active()->create();

    $response = $this->post(route('contact.store'), [
        'name' => 'John Doe',
        'phone' => '+6281234567890',
        'email' => 'john@example.com',
        'package_id' => $package->id,
        'message' => 'Saya tertarik dengan paket umroh',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('inquiries', [
        'name' => 'John Doe',
        'phone' => '+6281234567890',
        'package_id' => $package->id,
        'status' => 'new',
    ]);
});

test('invalid inquiry is rejected', function () {
    $response = $this->post(route('contact.store'), [
        'name' => '',
        'phone' => '',
        'message' => '',
    ]);

    $response->assertSessionHasErrors(['name', 'phone', 'message']);
});

test('inquiry rate limiting works', function () {
    WebsiteSetting::create(['key' => 'company_name', 'value' => 'Havana Travel']);

    for ($i = 0; $i < 5; $i++) {
        $this->post(route('contact.store'), [
            'name' => 'Test User',
            'phone' => '+6281234567890',
            'message' => 'Test message',
        ]);
    }

    $response = $this->post(route('contact.store'), [
        'name' => 'Test User',
        'phone' => '+6281234567890',
        'message' => 'Test message',
    ]);

    $response->assertSessionHasErrors('message');
});

test('package inquiry is stored with package association', function () {
    $package = Package::factory()->active()->create();

    $response = $this->post("/packages/{$package->slug}/inquiry", [
        'name' => 'Jane Doe',
        'phone' => '+6281234567890',
        'message' => 'Tertarik dengan paket ini',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('inquiries', [
        'name' => 'Jane Doe',
        'package_id' => $package->id,
    ]);
});

test('invalid package inquiry is rejected', function () {
    $package = Package::factory()->active()->create();

    $response = $this->post("/packages/{$package->slug}/inquiry", [
        'name' => '',
        'phone' => '',
    ]);

    $response->assertSessionHasErrors(['name', 'phone']);
});
