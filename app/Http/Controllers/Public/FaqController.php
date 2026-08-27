<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\WebsiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        $faqs = Faq::active()->ordered()->get();

        $structuredData = $faqs->map(fn (Faq $faq) => [
            '@type' => 'Question',
            'name' => $faq->question,
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => $faq->answer,
            ],
        ])->values();

        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';

        return Inertia::render('public/Faq', [
            'faqs' => $faqs,
            'seo' => [
                'title' => "FAQ Umroh | {$companyName}",
                'description' => "Pertanyaan yang sering diajukan tentang perjalanan umroh bersama {$companyName}.",
                'canonical' => '/faq',
            ],
            'structuredData' => $structuredData->isEmpty() ? null : [
                '@context' => 'https://schema.org',
                '@type' => 'FAQPage',
                'mainEntity' => $structuredData->toArray(),
            ],
        ]);
    }
}
