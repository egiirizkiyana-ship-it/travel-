<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHeroSlideRequest;
use App\Http\Requests\Admin\UpdateHeroSlideRequest;
use App\Models\HeroSection;
use App\Models\HeroSlide;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HeroSlideController extends Controller
{
    public function store(StoreHeroSlideRequest $request): RedirectResponse
    {
        $hero = HeroSection::firstOrFail();

        $hero->slides()->create($request->validated());

        return redirect()->route('admin.content.hero')
            ->with('success', 'Slide berhasil ditambahkan.');
    }

    public function update(UpdateHeroSlideRequest $request, HeroSlide $slide): RedirectResponse
    {
        $slide->update($request->validated());

        return redirect()->route('admin.content.hero')
            ->with('success', 'Slide berhasil diperbarui.');
    }

    public function destroy(HeroSlide $slide): RedirectResponse
    {
        $slide->delete();

        return redirect()->route('admin.content.hero')
            ->with('success', 'Slide berhasil dihapus.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,webp',
        ]);

        $file = $request->file('file');
        $filename = 'hero-slide-'.Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('images/hero'), $filename);

        return response()->json([
            'path' => '/images/hero/'.$filename,
        ]);
    }
}
