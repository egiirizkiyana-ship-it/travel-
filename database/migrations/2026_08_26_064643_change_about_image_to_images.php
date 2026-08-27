<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_sections', function (Blueprint $table) {
            if (! Schema::hasColumn('about_sections', 'images')) {
                $table->json('images')->nullable()->after('description');
            }
        });

        // Migrate existing single image value into the new JSON column
        if (Schema::hasColumn('about_sections', 'image')) {
            DB::table('about_sections')
                ->orderBy('id')
                ->whereNotNull('image')
                ->where('image', '!=', '')
                ->each(function ($row) {
                    DB::table('about_sections')
                        ->where('id', $row->id)
                        ->update(['images' => json_encode([$row->image])]);
                });

            Schema::table('about_sections', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        }
    }

    public function down(): void
    {
        Schema::table('about_sections', function (Blueprint $table) {
            $table->string('image')->nullable()->after('description');
        });

        DB::table('about_sections')
            ->orderBy('id')
            ->whereNotNull('images')
            ->each(function ($row) {
                $images = json_decode($row->images, true);
                DB::table('about_sections')
                    ->where('id', $row->id)
                    ->update(['image' => $images[0] ?? null]);
            });

        Schema::table('about_sections', function (Blueprint $table) {
            $table->dropColumn('images');
        });
    }
};
