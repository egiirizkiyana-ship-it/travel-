<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMediaRequest;
use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function __construct(
        private MediaService $mediaService,
    ) {}

    public function index(Request $request): Response
    {
        $query = Media::with('uploader');

        if ($search = $request->input('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('original_name', 'like', "%{$search}%")
                    ->orWhere('alt_text', 'like', "%{$search}%");
            });
        }

        if ($request->filled('type')) {
            $query->where('mime_type', 'like', $request->input('type').'%');
        }

        $media = $query->latest()->paginate(20)->withQueryString();

        return Inertia::render('admin/media/Index', [
            'media' => $media,
        ]);
    }

    public function store(StoreMediaRequest $request, MediaService $mediaService): RedirectResponse|JsonResponse
    {
        $media = $mediaService->upload(
            $request->file('file'),
            $request->input('alt_text'),
            $request->user()->id,
        );

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json(['filename' => $media->filename]);
        }

        return redirect()->route('admin.media.index')
            ->with('success', 'Media berhasil diupload.');
    }

    public function destroy(Media $media, MediaService $mediaService): RedirectResponse
    {
        if ($mediaService->isReferenced($media)) {
            $references = $mediaService->getReferences($media);
            $count = $references->sum('count');

            return redirect()->route('admin.media.index')
                ->with('error', "Gambar ini masih digunakan oleh {$count} konten.");
        }

        $mediaService->delete($media);

        return redirect()->route('admin.media.index')
            ->with('success', 'Media berhasil dihapus.');
    }
}
