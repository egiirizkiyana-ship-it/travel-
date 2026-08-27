<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\Package;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $baseUrl = config('app.url', 'http://localhost:8000');

        $staticPages = collect([
            ['url' => '/', 'lastmod' => now()->toIso8601String(), 'priority' => '1.0'],
            ['url' => '/tentang-kami', 'lastmod' => now()->toIso8601String(), 'priority' => '0.8'],
            ['url' => '/paket-umroh', 'lastmod' => now()->toIso8601String(), 'priority' => '0.9'],
            ['url' => '/destinasi', 'lastmod' => now()->toIso8601String(), 'priority' => '0.8'],
            ['url' => '/galeri', 'lastmod' => now()->toIso8601String(), 'priority' => '0.7'],
            ['url' => '/testimoni', 'lastmod' => now()->toIso8601String(), 'priority' => '0.6'],
            ['url' => '/faq', 'lastmod' => now()->toIso8601String(), 'priority' => '0.6'],
            ['url' => '/kontak', 'lastmod' => now()->toIso8601String(), 'priority' => '0.7'],
        ]);

        $packages = Package::active()
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Package $p) => [
                'url' => "/paket-umroh/{$p->slug}",
                'lastmod' => $p->updated_at->toIso8601String(),
                'priority' => '0.8',
            ]);

        $destinations = Destination::active()
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Destination $d) => [
                'url' => "/destinasi/{$d->slug}",
                'lastmod' => $d->updated_at->toIso8601String(),
                'priority' => '0.7',
            ]);

        $allUrls = $staticPages->concat($packages)->concat($destinations);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.PHP_EOL;

        foreach ($allUrls as $item) {
            $xml .= '  <url>'.PHP_EOL;
            $xml .= '    <loc>'.$baseUrl.$item['url'].'</loc>'.PHP_EOL;
            $xml .= '    <lastmod>'.$item['lastmod'].'</lastmod>'.PHP_EOL;
            $xml .= '    <changefreq>'.($item['url'] === '/' ? 'daily' : 'weekly').'</changefreq>'.PHP_EOL;
            $xml .= '    <priority>'.$item['priority'].'</priority>'.PHP_EOL;
            $xml .= '  </url>'.PHP_EOL;
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
