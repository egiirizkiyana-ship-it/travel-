<?php

namespace App\Models;

use Database\Factories\VisionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vision extends Model
{
    /** @use HasFactory<VisionFactory> */
    use HasFactory;

    /** @var list<string> */
    #[Fillable([
        'type',
        'title',
        'description',
        'sort_order',
        'is_active',
    ])]
    protected $fillable = [
        'type',
        'title',
        'description',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    public function scopeVision($query)
    {
        return $query->where('type', 'vision');
    }

    public function scopeMission($query)
    {
        return $query->where('type', 'mission');
    }
}
