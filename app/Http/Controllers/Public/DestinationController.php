<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\Package;
use App\Models\WebsiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    public function index(): Response
    {
        $destinations = Destination::active()->ordered()->get([
            'id', 'name', 'slug', 'description', 'image', 'is_featured', 'sort_order',
        ]);
        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';

        return Inertia::render('public/Destinations', [
            'destinations' => $destinations,
            'seo' => [
                'title' => "Destinasi | {$companyName}",
                'description' => "Jelajahi destinasi umroh bersama {$companyName}. Makkah, Madinah, dan kota-kota suci lainnya.",
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $destination = Destination::where('slug', $slug)->active()->firstOrFail();

        $relatedPackages = Package::active()->ordered()->limit(4)
            ->get(['id', 'name', 'slug', 'duration', 'price', 'image']);

        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';
        $whatsapp = $settings['whatsapp'] ?? '+6281234567890';

        $seoTitle = $destination->meta_title ?? "{$destination->name} | {$companyName}";
        $seoDescription = $destination->meta_description ?? mb_substr($destination->description ?? '', 0, 160);

        return Inertia::render('public/DestinationDetail', [
            'destination' => $destination,
            'relatedPackages' => $relatedPackages,
            'whatsapp' => $whatsapp,
            'seo' => [
                'title' => $seoTitle,
                'description' => $seoDescription,
                'image' => $destination->image,
                'canonical' => "/destinasi/{$destination->slug}",
            ],
        ]);
    }
}
