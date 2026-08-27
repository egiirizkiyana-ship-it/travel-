<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHeroRequest;
use App\Models\HeroSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HeroController extends Controller
{
    public function edit(): Response
    {
        $hero = HeroSection::firstOrCreate([], [
            'eyebrow' => 'Umroh Terbaik',
            'title' => 'Havana Travel',
            'description' => 'Perjalanan ibadah yang penuh makna',
            'is_active' => true,
        ]);

        $hero->load('slides');

        return Inertia::render('admin/content/hero/Edit', [
            'hero' => $hero,
        ]);
    }

    public function update(UpdateHeroRequest $request): RedirectResponse
    {
        $hero = HeroSection::firstOrFail();
        $hero->update($request->validated());

        return redirect()->route('admin.content.hero')
            ->with('success', 'Hero berhasil diperbarui.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,webp',
        ]);

        $file = $request->file('file');
        $filename = 'hero-'.Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('images/hero'), $filename);

        return response()->json([
            'path' => '/images/hero/'.$filename,
        ]);
    }
}
