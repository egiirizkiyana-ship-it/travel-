<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFeatureRequest;
use App\Http\Requests\Admin\UpdateFeatureRequest;
use App\Models\Feature;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FeatureController extends Controller
{
    public function index(): Response
    {
        $features = Feature::orderBy('sort_order')->get();

        return Inertia::render('admin/content/features/Index', [
            'features' => $features,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/features/Create');
    }

    public function store(StoreFeatureRequest $request): RedirectResponse
    {
        Feature::create($request->validated());

        return redirect()->route('admin.features.index')
            ->with('success', 'Keunggulan berhasil ditambahkan.');
    }

    public function show(Feature $feature): RedirectResponse
    {
        return redirect()->route('admin.features.edit', $feature);
    }

    public function edit(Feature $feature): Response
    {
        return Inertia::render('admin/content/features/Edit', [
            'feature' => $feature,
        ]);
    }

    public function update(UpdateFeatureRequest $request, Feature $feature): RedirectResponse
    {
        $feature->update($request->validated());

        return redirect()->route('admin.features.index')
            ->with('success', 'Keunggulan berhasil diperbarui.');
    }

    public function destroy(Feature $feature): RedirectResponse
    {
        $feature->delete();

        return redirect()->route('admin.features.index')
            ->with('success', 'Keunggulan berhasil dihapus.');
    }
}
