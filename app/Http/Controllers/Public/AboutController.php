<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use App\Models\History;
use App\Models\TeamMember;
use App\Models\Vision;
use App\Models\WebsiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $about = AboutSection::getActive();
        $settings = WebsiteSetting::getValues();
        $companyName = $settings['company_name'] ?? 'Havana Travel';

        $visions = Vision::active()->ordered()->get();
        $histories = History::active()->ordered()->get();
        $teamMembers = TeamMember::active()->ordered()->get();

        return Inertia::render('public/About', [
            'about' => $about,
            'visions' => $visions,
            'histories' => $histories,
            'teamMembers' => $teamMembers,
            'seo' => [
                'title' => "Tentang Kami | {$companyName}",
                'description' => "Kenali {$companyName} lebih dekat. Kami berdedikasi melayani perjalanan ibadah umroh dengan pelayanan terbaik dan penuh keberkahan.",
            ],
        ]);
    }
}
