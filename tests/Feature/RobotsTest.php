<?php

test('robots returns plain text response', function () {
    $response = $this->get('/robots.txt');

    $response->assertOk();
    $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
});

test('robots allows public pages', function () {
    $response = $this->get('/robots.txt');

    $response->assertSee('Allow: /');
});

test('robots disallows admin', function () {
    $response = $this->get('/robots.txt');

    $response->assertSee('Disallow: /admin');
    $response->assertSee('Disallow: /login');
    $response->assertSee('Disallow: /dashboard');
});

test('robots contains sitemap url', function () {
    $response = $this->get('/robots.txt');

    $response->assertSee(config('app.url').'/sitemap.xml');
});
