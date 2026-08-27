<?php

namespace App\Models;

use Database\Factories\PackageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Package extends Model
{
    /** @use HasFactory<PackageFactory> */
    use HasFactory;

    /** @var list<string> */
    #[Fillable([
        'name',
        'slug',
        'duration',
        'description',
        'price',
        'image',
        'is_featured',
        'is_active',
        'sort_order',
        'meta_title',
        'meta_description',
        'departure_city',
        'airline',
        'hotel_madinah',
        'hotel_madinah_distance',
        'hotel_madinah_room',
        'hotel_makkah',
        'hotel_makkah_distance',
        'hotel_makkah_room',
        'flight_notes',
    ])]
    protected $fillable = [
        'name',
        'slug',
        'duration',
        'description',
        'price',
        'image',
        'is_featured',
        'is_active',
        'sort_order',
        'meta_title',
        'meta_description',
        'departure_city',
        'airline',
        'hotel_madinah',
        'hotel_madinah_distance',
        'hotel_madinah_room',
        'hotel_makkah',
        'hotel_makkah_distance',
        'hotel_makkah_room',
        'flight_notes',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public static function boot(): void
    {
        parent::boot();

        static::creating(function (Package $package) {
            if (empty($package->slug)) {
                $package->slug = Str::slug($package->name);
            }
        });
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }

    public function facilities(): HasMany
    {
        return $this->hasMany(PackageFacility::class);
    }

    public function itineraries(): HasMany
    {
        return $this->hasMany(PackageItinerary::class);
    }

    public function included(): HasMany
    {
        return $this->hasMany(PackageIncluded::class);
    }

    public function notIncluded(): HasMany
    {
        return $this->hasMany(PackageNotIncluded::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
