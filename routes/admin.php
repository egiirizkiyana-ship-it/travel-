<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\AdminDestinationController;
use App\Http\Controllers\Admin\AdminFaqController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\AdminPackageController;
use App\Http\Controllers\Admin\AdminTestimonialController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FeatureController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\HistoryController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\VisionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', DashboardController::class)->name('dashboard');

    // Hero (single record)
    Route::get('content/hero', [HeroController::class, 'edit'])->name('content.hero');
    Route::put('content/hero', [HeroController::class, 'update'])->name('content.hero.update');
    Route::post('content/hero/image', [HeroController::class, 'uploadImage'])->name('content.hero.upload-image');
    Route::post('content/hero/slides', [HeroSlideController::class, 'store'])->name('content.hero.slides.store');
    Route::post('content/hero/slides/image', [HeroSlideController::class, 'uploadImage'])->name('content.hero.slides.upload-image');
    Route::put('content/hero/slides/{slide}', [HeroSlideController::class, 'update'])->name('content.hero.slides.update');
    Route::delete('content/hero/slides/{slide}', [HeroSlideController::class, 'destroy'])->name('content.hero.slides.destroy');

    // About (single record)
    Route::get('content/about', [AboutController::class, 'edit'])->name('content.about');
    Route::put('content/about', [AboutController::class, 'update'])->name('content.about.update');
    Route::post('content/about/image', [AboutController::class, 'uploadImage'])->name('content.about.upload-image');

    // Features (full CRUD)
    Route::resource('content/features', FeatureController::class);

    // Packages (full CRUD)
    Route::resource('content/packages', AdminPackageController::class);
    Route::post('content/packages/image', [AdminPackageController::class, 'uploadImage'])->name('packages.upload-image');

    // Destinations (full CRUD)
    Route::resource('content/destinations', AdminDestinationController::class);
    Route::post('content/destinations/image', [AdminDestinationController::class, 'uploadImage'])->name('destinations.upload-image');

    // Gallery (full CRUD)
    Route::resource('content/gallery', AdminGalleryController::class);
    Route::post('content/gallery/image', [AdminGalleryController::class, 'uploadImage'])->name('gallery.upload-image');

    // Testimonials (full CRUD)
    Route::resource('content/testimonials', AdminTestimonialController::class);
    Route::post('content/testimonials/image', [AdminTestimonialController::class, 'uploadImage'])->name('testimonials.upload-image');

    // FAQs (full CRUD)
    Route::resource('content/faqs', AdminFaqController::class);

    // Team Members (full CRUD)
    Route::resource('content/team-members', TeamMemberController::class);
    Route::post('content/team-members/image', [TeamMemberController::class, 'uploadImage'])->name('team-members.upload-image');

    // Visions (full CRUD)
    Route::resource('content/visions', VisionController::class);

    // Histories (full CRUD)
    Route::resource('content/histories', HistoryController::class);
    Route::post('content/histories/image', [HistoryController::class, 'uploadImage'])->name('histories.upload-image');

    // Media
    Route::get('media', [MediaController::class, 'index'])->name('media.index');
    Route::post('media', [MediaController::class, 'store'])->name('media.store');
    Route::delete('media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');

    // Inquiries
    Route::get('inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
    Route::get('inquiries/{inquiry}', [InquiryController::class, 'show'])->name('inquiries.show');
    Route::patch('inquiries/{inquiry}/status', [InquiryController::class, 'updateStatus'])->name('inquiries.status');

    // Settings
    Route::get('settings', [SettingController::class, 'index'])->name('settings');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
});
