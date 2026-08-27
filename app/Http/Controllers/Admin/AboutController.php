<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAboutRequest;
use App\Models\AboutSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function edit(): Response
    {
        $about = AboutSection::firstOrCreate([], [
            'eyebrow' => 'Tentang Kami',
            'title' => 'Havana Travel',
            'description' => 'Havana Travel adalah perusahaan travel umroh terpercaya.',
            'is_active' => true,
        ]);

        return Inertia::render('admin/content/about/Edit', [
            'about' => $about,
        ]);
    }

    public function update(UpdateAboutRequest $request): RedirectResponse
    {
        $about = AboutSection::firstOrFail();
        $about->update($request->validated());

        return redirect()->route('admin.content.about')
            ->with('success', 'Tentang Kami berhasil diperbarui.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,webp',
        ]);

        $file = $request->file('file');
        $filename = 'about-'.Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('images/about'), $filename);

        return response()->json([
            'path' => '/images/about/'.$filename,
        ]);
    }
}
