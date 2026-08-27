<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHistoryRequest;
use App\Http\Requests\Admin\UpdateHistoryRequest;
use App\Models\History;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HistoryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = History::query();

        if ($search = $request->input('q')) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('year', 'like', "%{$search}%");
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->boolean('status'));
        }

        $histories = $query->ordered()->paginate(15)->withQueryString();

        return Inertia::render('admin/content/histories/Index', [
            'histories' => $histories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/histories/Create');
    }

    public function store(StoreHistoryRequest $request): RedirectResponse
    {
        History::create($request->validated());

        return redirect()->route('admin.histories.index')
            ->with('success', 'Sejarah berhasil ditambahkan.');
    }

    public function show(History $history): RedirectResponse
    {
        return redirect()->route('admin.histories.edit', $history);
    }

    public function edit(History $history): Response
    {
        return Inertia::render('admin/content/histories/Edit', [
            'history' => $history,
        ]);
    }

    public function update(UpdateHistoryRequest $request, History $history): RedirectResponse
    {
        $history->update($request->validated());

        return redirect()->route('admin.histories.index')
            ->with('success', 'Sejarah berhasil diperbarui.');
    }

    public function destroy(History $history): RedirectResponse
    {
        $history->delete();

        return redirect()->route('admin.histories.index')
            ->with('success', 'Sejarah berhasil dihapus.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,webp',
        ]);

        /** @var UploadedFile $file */
        $file = $request->file('file');
        $filename = 'history-'.Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('images/histories'), $filename);

        return response()->json([
            'path' => '/images/histories/'.$filename,
        ]);
    }
}
