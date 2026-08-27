<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Models\WebsiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        $testimonials = Testimonial::active()
            ->orderBy('is_featured', 'desc')
            ->ordered()
            ->get();

        $stats = [
            'average_rating' => round((float) Testimonial::active()->avg('rating'), 1),
            'total' => Testimonial::active()->count(),
        ];

        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';

        return Inertia::render('public/Testimonials', [
            'testimonials' => $testimonials,
            'stats' => $stats,
            'seo' => [
                'title' => "Testimoni Jamaah | {$companyName}",
                'description' => "Kata mereka tentang {$companyName}. Testimoni jamaah yang telah menunaikan ibadah umroh bersama kami.",
                'canonical' => '/testimoni',
            ],
        ]);
    }
}
