<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDestinationRequest;
use App\Http\Requests\Admin\UpdateDestinationRequest;
use App\Models\Destination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminDestinationController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Destination::query();

        if ($search = $request->input('q')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->boolean('status'));
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        $destinations = $query->orderBy('sort_order')->paginate(15)->withQueryString();

        return Inertia::render('admin/content/destinations/Index', [
            'destinations' => $destinations,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/destinations/Create');
    }

    public function store(StoreDestinationRequest $request): RedirectResponse
    {
        Destination::create($request->validated());

        return redirect()->route('admin.destinations.index')
            ->with('success', 'Destinasi berhasil ditambahkan.');
    }

    public function show(Destination $destination): RedirectResponse
    {
        return redirect()->route('admin.destinations.edit', $destination);
    }

    public function edit(Destination $destination): Response
    {
        return Inertia::render('admin/content/destinations/Edit', [
            'destination' => $destination,
        ]);
    }

    public function update(UpdateDestinationRequest $request, Destination $destination): RedirectResponse
    {
        $destination->update($request->validated());

        return redirect()->route('admin.destinations.index')
            ->with('success', 'Destinasi berhasil diperbarui.');
    }

    public function destroy(Destination $destination): RedirectResponse
    {
        $destination->delete();

        return redirect()->route('admin.destinations.index')
            ->with('success', 'Destinasi berhasil dihapus.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,webp',
        ]);

        /** @var UploadedFile $file */
        $file = $request->file('file');
        $filename = 'destination-'.Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('images/destinations'), $filename);

        return response()->json([
            'path' => '/images/destinations/'.$filename,
        ]);
    }
}
