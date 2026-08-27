<?php

namespace App\Models;

use Database\Factories\InquiryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inquiry extends Model
{
    /** @use HasFactory<InquiryFactory> */
    use HasFactory;

    /** @var list<string> */
    #[Fillable([
        'name',
        'phone',
        'email',
        'package_id',
        'message',
        'status',
    ])]
    protected $fillable = [
        'name',
        'phone',
        'email',
        'package_id',
        'message',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'package_id' => 'integer',
        ];
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function scopeStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }
}
