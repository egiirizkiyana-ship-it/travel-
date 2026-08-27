<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\Faq;
use App\Models\GalleryItem;
use App\Models\Inquiry;
use App\Models\Package;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'totalPackages' => Package::count(),
                'totalDestinations' => Destination::count(),
                'totalGallery' => GalleryItem::count(),
                'totalTestimonials' => Testimonial::count(),
                'totalFaq' => Faq::count(),
                'newInquiries' => Inquiry::new()->count(),
            ],
            'recentInquiries' => Inquiry::with('package')
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn ($inquiry) => [
                    'id' => $inquiry->id,
                    'name' => $inquiry->name,
                    'phone' => $inquiry->phone,
                    'status' => $inquiry->status,
                    'created_at' => $inquiry->created_at,
                    'package' => $inquiry->package,
                ]),
        ]);
    }
}
