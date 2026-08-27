<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTeamMemberRequest;
use App\Http\Requests\Admin\UpdateTeamMemberRequest;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function index(Request $request): Response
    {
        $query = TeamMember::query();

        if ($search = $request->input('q')) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('position', 'like', "%{$search}%");
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->boolean('status'));
        }

        $members = $query->ordered()->paginate(15)->withQueryString();

        return Inertia::render('admin/content/team-members/Index', [
            'members' => $members,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/content/team-members/Create');
    }

    public function store(StoreTeamMemberRequest $request): RedirectResponse
    {
        TeamMember::create($request->validated());

        return redirect()->route('admin.team-members.index')
            ->with('success', 'Anggota tim berhasil ditambahkan.');
    }

    public function show(TeamMember $teamMember): RedirectResponse
    {
        return redirect()->route('admin.team-members.edit', $teamMember);
    }

    public function edit(TeamMember $teamMember): Response
    {
        return Inertia::render('admin/content/team-members/Edit', [
            'member' => $teamMember,
        ]);
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $teamMember): RedirectResponse
    {
        $teamMember->update($request->validated());

        return redirect()->route('admin.team-members.index')
            ->with('success', 'Anggota tim berhasil diperbarui.');
    }

    public function destroy(TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();

        return redirect()->route('admin.team-members.index')
            ->with('success', 'Anggota tim berhasil dihapus.');
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:5120|mimes:jpg,jpeg,png,webp',
        ]);

        /** @var UploadedFile $file */
        $file = $request->file('file');
        $filename = 'team-'.Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('images/team'), $filename);

        return response()->json([
            'path' => '/images/team/'.$filename,
        ]);
    }
}
