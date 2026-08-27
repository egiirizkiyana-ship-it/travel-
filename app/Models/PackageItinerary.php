<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PackageItinerary extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id',
        'day_number',
        'title',
        'location',
        'description',
        'sort_order',
    ];

    protected $casts = [
        'day_number' => 'integer',
        'sort_order' => 'integer',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('day_number')->orderBy('sort_order');
    }
}
