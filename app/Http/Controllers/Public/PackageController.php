<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Package;
use App\Models\WebsiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(): Response
    {
        $packages = Package::active()->ordered()->get([
            'id', 'name', 'slug', 'duration', 'description', 'price', 'image', 'is_featured', 'sort_order',
        ]);
        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';

        return Inertia::render('public/Packages', [
            'packages' => $packages,
            'seo' => [
                'title' => "Paket Umroh | {$companyName}",
                'description' => "Temukan paket umroh terbaik dari {$companyName}. Pilihan paket lengkap dengan hotel, maskapai, dan bimbingan ibadah.",
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $package = Package::where('slug', $slug)->active()
            ->with(['facilities', 'itineraries', 'included', 'notIncluded'])
            ->firstOrFail();

        $relatedPackages = Package::active()
            ->where('id', '!=', $package->id)
            ->ordered()
            ->limit(4)
            ->get(['id', 'name', 'slug', 'duration', 'price', 'image']);

        $faqs = Faq::active()->ordered()->get();

        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';
        $whatsapp = $settings['whatsapp'] ?? '+6281234567890';

        $seoTitle = $package->meta_title ?: "{$package->name} | {$companyName}";
        $seoDescription = $package->meta_description ?: mb_substr($package->description ?? '', 0, 160);

        return Inertia::render('public/PackageDetail', [
            'package' => $package,
            'relatedPackages' => $relatedPackages,
            'faqs' => $faqs,
            'whatsapp' => $whatsapp,
            'seo' => [
                'title' => $seoTitle,
                'description' => $seoDescription,
                'image' => $package->image,
                'canonical' => "/paket-umroh/{$package->slug}",
            ],
        ]);
    }
}
