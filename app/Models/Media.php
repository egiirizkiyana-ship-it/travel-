<?php

namespace App\Models;

use Database\Factories\MediaFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model
{
    /** @use HasFactory<MediaFactory> */
    use HasFactory;

    /** @var list<string> */
    #[Fillable([
        'filename',
        'original_name',
        'path',
        'mime_type',
        'size',
        'alt_text',
        'uploaded_by',
    ])]
    protected $fillable = [
        'filename',
        'original_name',
        'path',
        'mime_type',
        'size',
        'alt_text',
        'uploaded_by',
    ];

    protected function casts(): array
    {
        return [
            'size' => 'integer',
            'uploaded_by' => 'integer',
        ];
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
