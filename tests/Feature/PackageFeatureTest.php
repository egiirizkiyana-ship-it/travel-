<?php

use App\Models\Destination;
use App\Models\Faq;
use App\Models\Package;
use App\Models\PackageFacility;
use App\Models\PackageIncluded;
use App\Models\PackageItinerary;
use App\Models\PackageNotIncluded;
use App\Models\WebsiteSetting;

test('guest can view package listing', function () {
    Package::factory()->count(3)->active()->create();

    $response = $this->get('/packages');

    $response->assertOk();
});

test('guest can view active package detail with relationships', function () {
    $package = Package::factory()->active()->create();
    PackageFacility::factory()->count(2)->create(['package_id' => $package->id]);
    PackageItinerary::factory()->count(2)->create(['package_id' => $package->id]);
    PackageIncluded::factory()->count(2)->create(['package_id' => $package->id]);
    PackageNotIncluded::factory()->count(2)->create(['package_id' => $package->id]);
    Faq::factory()->count(2)->active()->create();
    WebsiteSetting::create(['key' => 'whatsapp', 'value' => '+6281234567890']);

    $response = $this->get("/packages/{$package->slug}");

    $response->assertOk();
});

test('guest cannot view inactive package detail', function () {
    $package = Package::factory()->inactive()->create();

    $response = $this->get("/packages/{$package->slug}");

    $response->assertNotFound();
});

test('guest can view destination listing', function () {
    Destination::factory()->count(3)->active()->create();

    $response = $this->get('/destinations');

    $response->assertOk();
});

test('guest can view active destination detail', function () {
    $destination = Destination::factory()->active()->create();
    Package::factory()->count(3)->active()->create();
    WebsiteSetting::create(['key' => 'whatsapp', 'value' => '+6281234567890']);

    $response = $this->get("/destinations/{$destination->slug}");

    $response->assertOk();
});

test('guest cannot view inactive destination', function () {
    $destination = Destination::factory()->inactive()->create();

    $response = $this->get("/destinations/{$destination->slug}");

    $response->assertNotFound();
});

test('guest can submit package inquiry', function () {
    $package = Package::factory()->active()->create();

    $response = $this->post("/packages/{$package->slug}/inquiry", [
        'name' => 'John Doe',
        'phone' => '+6281234567890',
        'email' => 'john@example.com',
        'message' => 'Saya tertarik dengan paket ini',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('inquiries', [
        'name' => 'John Doe',
        'package_id' => $package->id,
        'status' => 'new',
    ]);
});

test('invalid package inquiry is rejected', function () {
    $package = Package::factory()->active()->create();

    $response = $this->post("/packages/{$package->slug}/inquiry", [
        'name' => '',
        'phone' => '',
    ]);

    $response->assertSessionHasErrors();
});
