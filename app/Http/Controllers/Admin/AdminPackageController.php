<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePackageRequest;
use App\Http\Requests\Admin\UpdatePackageRequest;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminPackageController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Package::query();

        if ($search = $request->input('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('duration', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->boolean('status'));
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        $packages = $query->orderBy('sort_order')->paginate(15)->withQueryString();

        return Inertia::render('admin/content/packages/Index', [
            'packages' => $packages,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/packages/Create');
    }

    public function store(StorePackageRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $facilities = $validated['facilities'] ?? [];
        $itineraries = $validated['itineraries'] ?? [];
        $included = $validated['included'] ?? [];
        $notIncluded = $validated['not_included'] ?? [];

        unset($validated['facilities'], $validated['itineraries'], $validated['included'], $validated['not_included']);

        $package = Package::create($validated);

        foreach ($facilities as $facility) {
            $package->facilities()->create($facility);
        }
        foreach ($itineraries as $itinerary) {
            $package->itineraries()->create($itinerary);
        }
        foreach ($included as $item) {
            $package->included()->create($item);
        }
        foreach ($notIncluded as $item) {
            $package->notIncluded()->create($item);
        }

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil ditambahkan.');
    }

    public function show(Package $package): RedirectResponse
    {
        return redirect()->route('admin.packages.edit', $package);
    }

    public function edit(Package $package): Response
    {
        $package->load(['facilities', 'itineraries', 'included', 'notIncluded']);

        return Inertia::render('admin/content/packages/Edit', [
            'package' => $package,
        ]);
    }

    public function update(UpdatePackageRequest $request, Package $package): RedirectResponse
    {
        $validated = $request->validated();

        $facilities = $validated['facilities'] ?? [];
        $itineraries = $validated['itineraries'] ?? [];
        $included = $validated['included'] ?? [];
        $notIncluded = $validated['not_included'] ?? [];

        unset($validated['facilities'], $validated['itineraries'], $validated['included'], $validated['not_included']);

        $package->update($validated);

        $package->facilities()->delete();
        $package->itineraries()->delete();
        $package->included()->delete();
        $package->notIncluded()->delete();

        foreach ($facilities as $facility) {
            $package->facilities()->create($facility);
        }
        foreach ($itineraries as $itinerary) {
            $package->itineraries()->create($itinerary);
        }
        foreach ($included as $item) {
            $package->included()->create($item);
        }
        foreach ($notIncluded as $item) {
            $package->notIncluded()->create($item);
        }

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil diperbarui.');
    }

    public function destroy(Package $package): RedirectResponse
    {
        $package->delete();

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil dihapus.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,webp',
        ]);

        /** @var UploadedFile $file */
        $file = $request->file('file');
        $filename = 'package-'.Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('images/packages'), $filename);

        return response()->json([
            'path' => '/images/packages/'.$filename,
        ]);
    }
}
