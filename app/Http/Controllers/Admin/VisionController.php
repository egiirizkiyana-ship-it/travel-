<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreVisionRequest;
use App\Http\Requests\Admin\UpdateVisionRequest;
use App\Models\Vision;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VisionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Vision::query();

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->boolean('status'));
        }

        $visions = $query->ordered()->paginate(15)->withQueryString();

        return Inertia::render('admin/content/visions/Index', [
            'visions' => $visions,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/visions/Create');
    }

    public function store(StoreVisionRequest $request): RedirectResponse
    {
        Vision::create($request->validated());

        return redirect()->route('admin.visions.index')
            ->with('success', 'Visi & Misi berhasil ditambahkan.');
    }

    public function show(Vision $vision): RedirectResponse
    {
        return redirect()->route('admin.visions.edit', $vision);
    }

    public function edit(Vision $vision): Response
    {
        return Inertia::render('admin/content/visions/Edit', [
            'vision' => $vision,
        ]);
    }

    public function update(UpdateVisionRequest $request, Vision $vision): RedirectResponse
    {
        $vision->update($request->validated());

        return redirect()->route('admin.visions.index')
            ->with('success', 'Visi & Misi berhasil diperbarui.');
    }

    public function destroy(Vision $vision): RedirectResponse
    {
        $vision->delete();

        return redirect()->route('admin.visions.index')
            ->with('success', 'Visi & Misi berhasil dihapus.');
    }
}
