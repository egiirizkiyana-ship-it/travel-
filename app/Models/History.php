<?php

namespace App\Models;

use Database\Factories\HistoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    /** @use HasFactory<HistoryFactory> */
    use HasFactory;

    /** @var list<string> */
    #[Fillable([
        'year',
        'title',
        'description',
        'image',
        'sort_order',
        'is_active',
    ])]
    protected $fillable = [
        'year',
        'title',
        'description',
        'image',
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
}
