<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreInquiryStatusRequest;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Inquiry::with('package');

        if ($search = $request->input('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $inquiries = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('admin/inquiries/Index', [
            'inquiries' => $inquiries,
        ]);
    }

    public function show(Inquiry $inquiry): Response
    {
        $inquiry->load('package');

        return Inertia::render('admin/inquiries/Show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function updateStatus(StoreInquiryStatusRequest $request, Inquiry $inquiry): RedirectResponse
    {
        $inquiry->update($request->validated());

        return redirect()->route('admin.inquiries.show', $inquiry)
            ->with('success', 'Status berhasil diperbarui.');
    }
}
