<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Package;
use App\Models\WebsiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $packages = Package::active()->ordered()->get(['id', 'name']);

        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';

        return Inertia::render('public/Contact', [
            'packages' => $packages,
            'settings' => [
                'company_name' => $companyName,
                'phone' => $settings['phone'] ?? '',
                'whatsapp' => $settings['whatsapp'] ?? '',
                'email' => $settings['email'] ?? '',
                'address' => $settings['address'] ?? '',
                'instagram' => $settings['instagram'] ?? '',
                'facebook' => $settings['facebook'] ?? '',
                'youtube' => $settings['youtube'] ?? '',
            ],
            'seo' => [
                'title' => "Hubungi Kami | {$companyName}",
                'description' => "Hubungi {$companyName} untuk informasi lebih lanjut mengenai paket umroh. Konsultasi gratis via WhatsApp.",
                'canonical' => '/kontak',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $throttleKey = 'inquiry:'.($request->ip() ?? 'unknown');

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            return back()->withErrors([
                'message' => "Terlalu banyak pengiriman. Silakan coba lagi dalam {$seconds} detik.",
            ])->withInput();
        }

        RateLimiter::hit($throttleKey, 60);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:30',
            'email' => 'nullable|email|max:255',
            'package_id' => 'nullable|exists:packages,id',
            'message' => 'required|string|max:2000',
        ]);

        Inquiry::create($validated);

        return back()->with('success', 'Terima kasih. Pertanyaan Anda sudah kami terima. Tim kami akan segera menghubungi Anda.');
    }

    public function storePackageInquiry(Request $request, string $slug): RedirectResponse
    {
        $package = Package::where('slug', $slug)->active()->firstOrFail();

        $throttleKey = 'package-inquiry:'.($request->ip() ?? 'unknown');

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            return back()->withErrors([
                'message' => "Terlalu banyak pengiriman. Silakan coba lagi dalam {$seconds} detik.",
            ])->withInput();
        }

        RateLimiter::hit($throttleKey, 60);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:30',
            'email' => 'nullable|email|max:255',
            'message' => 'nullable|string|max:2000',
        ]);

        Inquiry::create([
            ...$validated,
            'package_id' => $package->id,
        ]);

        return redirect()->route('packages.show', $slug)
            ->with('success', 'Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
    }
}
