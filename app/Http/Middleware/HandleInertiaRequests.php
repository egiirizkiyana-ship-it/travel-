<?php

namespace App\Http\Middleware;

use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = WebsiteSetting::getValues();

        $isAdmin = $request->is('admin/*') || $request->is('login');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'appUrl' => config('app.url'),
            'robots' => $isAdmin ? 'noindex, nofollow' : 'index, follow',
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'site' => [
                'brandName' => $settings['company_name'] ?? 'Havana Travel',
                'tagline' => $settings['tagline'] ?? 'Perjalanan Ibadah yang Penuh Makna',
                'phone' => $settings['phone'] ?? '+62 21 1234 5678',
                'whatsapp' => $settings['whatsapp'] ?? '+62 812 3456 7890',
                'email' => $settings['email'] ?? 'info@havanatravel.co.id',
                'address' => $settings['address'] ?? 'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta',
                'instagram' => $settings['instagram'] ?? null,
                'facebook' => $settings['facebook'] ?? null,
                'youtube' => $settings['youtube'] ?? null,
                'logo' => $settings['logo'] ?? null,
            ],
        ];
    }
}
