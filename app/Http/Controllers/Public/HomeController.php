<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use App\Models\Destination;
use App\Models\Faq;
use App\Models\Feature;
use App\Models\GalleryItem;
use App\Models\HeroSection;
use App\Models\Package;
use App\Models\Testimonial;
use App\Models\WebsiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';

        $hero = HeroSection::getActive();
        $heroSlides = $hero?->slides()->active()->get() ?? collect();
        $about = AboutSection::getActive();
        $features = Feature::active()->ordered()->limit(8)->get();
        $featuredPackages = Package::active()->ordered()->limit(6)->get();
        $featuredDestinations = Destination::active()->ordered()->limit(6)->get();
        $gallery = GalleryItem::active()->ordered()->limit(8)->get();
        $featuredTestimonials = Testimonial::active()
            ->orderBy('is_featured', 'desc')
            ->ordered()
            ->limit(6)
            ->get();
        $faqs = Faq::active()->ordered()->limit(5)->get();

        return Inertia::render('public/Home', [
            'hero' => $hero,
            'heroSlides' => $heroSlides,
            'about' => $about,
            'features' => $features,
            'featuredPackages' => $featuredPackages,
            'featuredDestinations' => $featuredDestinations,
            'gallery' => $gallery,
            'featuredTestimonials' => $featuredTestimonials,
            'faqs' => $faqs,
            'seo' => [
                'title' => "Umroh Nyaman & Terpercaya | {$companyName}",
                'description' => "{$companyName} melayani perjalanan umroh dengan pelayanan terbaik, hotel dekat masjid, dan bimbingan ibadah yang berkualitas.",
                'image' => $hero?->background_image,
            ],
        ]);
    }
}
