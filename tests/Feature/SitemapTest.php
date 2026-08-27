<?php

use App\Models\Destination;
use App\Models\Package;

test('sitemap returns xml response', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    $response->assertHeader('Content-Type', 'application/xml');
});

test('sitemap contains static pages', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertSee('loc');
    $response->assertSee('/');
    $response->assertSee('/tentang-kami');
    $response->assertSee('/paket-umroh');
    $response->assertSee('/destinasi');
    $response->assertSee('/galeri');
    $response->assertSee('/testimoni');
    $response->assertSee('/faq');
    $response->assertSee('/kontak');
});

test('sitemap contains active packages', function () {
    Package::factory()->create(['slug' => 'umroh-reguler', 'is_active' => true]);

    $response = $this->get('/sitemap.xml');

    $response->assertSee('/paket-umroh/umroh-reguler');
});

test('sitemap does not contain inactive packages', function () {
    Package::factory()->create(['slug' => 'umroh-hidden', 'is_active' => false]);

    $response = $this->get('/sitemap.xml');

    $response->assertDontSee('/paket-umroh/umroh-hidden');
});

test('sitemap contains active destinations', function () {
    Destination::factory()->create(['slug' => 'makkah', 'is_active' => true]);

    $response = $this->get('/sitemap.xml');

    $response->assertSee('/destinasi/makkah');
});

test('sitemap does not contain inactive destinations', function () {
    Destination::factory()->create(['slug' => 'hidden-dest', 'is_active' => false]);

    $response = $this->get('/sitemap.xml');

    $response->assertDontSee('/destinasi/hidden-dest');
});

test('sitemap uses absolute urls', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertSee(config('app.url'));
});
