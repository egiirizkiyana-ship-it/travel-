<?php

namespace App\Models;

use Database\Factories\AboutSectionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    /** @use HasFactory<AboutSectionFactory> */
    use HasFactory;

    /** @var list<string> */
    #[Fillable([
        'eyebrow',
        'title',
        'description',
        'images',
        'button_text',
        'button_url',
        'is_active',
    ])]
    protected $fillable = [
        'eyebrow',
        'title',
        'description',
        'images',
        'button_text',
        'button_url',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function getActive(): ?static
    {
        return static::active()->first();
    }
}
