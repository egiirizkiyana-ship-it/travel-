<?php

namespace App\Services;

use App\Models\AboutSection;
use App\Models\Destination;
use App\Models\GalleryItem;
use App\Models\HeroSection;
use App\Models\Media;
use App\Models\Package;
use App\Models\Testimonial;
use App\Models\WebsiteSetting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaService
{
    public function upload(UploadedFile $file, ?string $altText = null, ?int $userId = null): Media
    {
        $filename = Str::uuid().'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs('public', $filename);

        return Media::create([
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'alt_text' => $altText,
            'uploaded_by' => $userId,
        ]);
    }

    public function delete(Media $media): bool
    {
        if ($this->isReferenced($media)) {
            return false;
        }

        Storage::disk('public')->delete($media->filename);

        $media->delete();

        return true;
    }

    public function isReferenced(Media $media): bool
    {
        return $this->getReferences($media)->isNotEmpty();
    }

    /**
     * Get all models that reference this media file.
     *
     * @return Collection<int, object>
     */
    public function getReferences(Media $media): Collection
    {
        $filename = $media->filename;
        $references = collect();

        // Check hero sections
        $heroCount = HeroSection::where('background_image', $filename)->count();
        if ($heroCount > 0) {
            $references->push((object) ['type' => 'Hero Section', 'count' => $heroCount]);
        }

        // Check about sections
        $aboutCount = AboutSection::where('image', $filename)->count();
        if ($aboutCount > 0) {
            $references->push((object) ['type' => 'About Section', 'count' => $aboutCount]);
        }

        // Check packages
        $packageCount = Package::where('image', $filename)->count();
        if ($packageCount > 0) {
            $references->push((object) ['type' => 'Paket', 'count' => $packageCount]);
        }

        // Check destinations
        $destCount = Destination::where('image', $filename)->count();
        if ($destCount > 0) {
            $references->push((object) ['type' => 'Destinasi', 'count' => $destCount]);
        }

        // Check gallery items
        $galleryCount = GalleryItem::where('image', $filename)->count();
        if ($galleryCount > 0) {
            $references->push((object) ['type' => 'Galeri', 'count' => $galleryCount]);
        }

        // Check testimonials (avatar)
        $testCount = Testimonial::where('avatar', $filename)->count();
        if ($testCount > 0) {
            $references->push((object) ['type' => 'Testimoni', 'count' => $testCount]);
        }

        // Check website settings (logo, favicon, etc.)
        $settingsCount = WebsiteSetting::where('value', $filename)->count();
        if ($settingsCount > 0) {
            $references->push((object) ['type' => 'Pengaturan Website', 'count' => $settingsCount]);
        }

        return $references;
    }

    public function getPublicUrl(string $filename): string
    {
        return Storage::disk('public')->url($filename);
    }
}
