<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(Request $request): Response
    {
        $gallery = GalleryItem::active()->ordered()->get();

        $categories = GalleryItem::active()
            ->select('category')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('category')
            ->orderBy('category')
            ->get()
            ->map(fn ($item) => [
                'value' => $item->category,
                'label' => match ($item->category) {
                    'makkah' => 'Makkah',
                    'madinah' => 'Madinah',
                    'jamaah' => 'Jamaah',
                    'hotel' => 'Hotel',
                    'transportation' => 'Transportasi',
                    'other' => 'Lainnya',
                    default => ucfirst($item->category),
                },
                'count' => $item->count,
            ]);

        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';

        return Inertia::render('public/Gallery', [
            'gallery' => $gallery,
            'categories' => $categories,
            'seo' => [
                'title' => "Galeri Perjalanan | {$companyName}",
                'description' => "Melihat kembali momen perjalanan bersama jamaah {$companyName}. Potret perjalanan ibadah umroh yang berkesan.",
                'canonical' => '/galeri',
            ],
        ]);
    }
}
