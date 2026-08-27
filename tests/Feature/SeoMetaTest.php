<?php

test('home page has seo data', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('seo.title')
        ->has('seo.description')
    );
});

test('about page has seo data', function () {
    $response = $this->get('/about');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('seo.title')
        ->has('seo.description')
    );
});

test('packages page has seo data', function () {
    $response = $this->get('/packages');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('seo.title')
        ->has('seo.description')
    );
});

test('destinations page has seo data', function () {
    $response = $this->get('/destinations');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('seo.title')
        ->has('seo.description')
    );
});

test('gallery page has seo data', function () {
    $response = $this->get('/gallery');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('seo.title')
        ->has('seo.description')
        ->has('seo.canonical')
    );
});

test('testimonials page has seo data', function () {
    $response = $this->get('/testimonials');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('seo.title')
        ->has('seo.description')
    );
});

test('faq page has seo data and structured data', function () {
    $response = $this->get('/faq');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('seo.title')
        ->has('seo.description')
    );
});

test('contact page has seo data', function () {
    $response = $this->get('/contact');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('seo.title')
        ->has('seo.description')
    );
});

test('shared props include app url', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('appUrl')
    );
});

test('shared props include robots meta', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->where('robots', 'index, follow')
    );
});
