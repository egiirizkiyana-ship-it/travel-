<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\DestinationController;
use App\Http\Controllers\Public\FaqController;
use App\Http\Controllers\Public\GalleryController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PackageController;
use App\Http\Controllers\Public\RobotsTxtController;
use App\Http\Controllers\Public\SitemapController;
use App\Http\Controllers\Public\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/robots.txt', RobotsTxtController::class)->name('robots');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});

Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/packages', [PackageController::class, 'index'])->name('packages');
Route::get('/packages/{slug}', [PackageController::class, 'show'])->name('packages.show');
Route::post('/packages/{slug}/inquiry', [ContactController::class, 'storePackageInquiry'])->name('packages.inquiry');
Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations');
Route::get('/destinations/{slug}', [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');
Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials');
Route::get('/faq', [FaqController::class, 'index'])->name('faq');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
