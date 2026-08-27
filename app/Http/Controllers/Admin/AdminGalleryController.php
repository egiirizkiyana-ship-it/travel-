<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryItemRequest;
use App\Http\Requests\Admin\UpdateGalleryItemRequest;
use App\Models\GalleryItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminGalleryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = GalleryItem::query();

        if ($search = $request->input('q')) {
            $query->where('title', 'like', "%{$search}%");
        }

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->boolean('status'));
        }

        $gallery = $query->orderBy('sort_order')->paginate(15)->withQueryString();

        return Inertia::render('admin/content/gallery/Index', [
            'gallery' => $gallery,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/gallery/Create');
    }

    public function store(StoreGalleryItemRequest $request): RedirectResponse
    {
        GalleryItem::create($request->validated());

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Galeri berhasil ditambahkan.');
    }

    public function show(GalleryItem $gallery): RedirectResponse
    {
        return redirect()->route('admin.gallery.edit', $gallery);
    }

    public function edit(GalleryItem $gallery): Response
    {
        return Inertia::render('admin/content/gallery/Edit', [
            'galleryItem' => $gallery,
        ]);
    }

    public function update(UpdateGalleryItemRequest $request, GalleryItem $gallery): RedirectResponse
    {
        $gallery->update($request->validated());

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Galeri berhasil diperbarui.');
    }

    public function destroy(GalleryItem $gallery): RedirectResponse
    {
        $gallery->delete();

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Galeri berhasil dihapus.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,webp',
        ]);

        /** @var UploadedFile $file */
        $file = $request->file('file');
        $filename = 'gallery-'.Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('images/gallery'), $filename);

        return response()->json([
            'path' => '/images/gallery/'.$filename,
        ]);
    }
}
