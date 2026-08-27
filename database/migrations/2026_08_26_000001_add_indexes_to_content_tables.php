<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order']);
            $table->index('is_featured');
        });

        Schema::table('destinations', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order']);
            $table->index('is_featured');
        });

        Schema::table('gallery_items', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order']);
            $table->index('category');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order']);
            $table->index('is_featured');
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order']);
        });

        Schema::table('features', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order']);
        });

        Schema::table('hero_sections', function (Blueprint $table) {
            $table->index('is_active');
        });

        Schema::table('inquiries', function (Blueprint $table) {
            $table->index('status');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'sort_order']);
            $table->dropIndex('is_featured');
        });

        Schema::table('destinations', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'sort_order']);
            $table->dropIndex('is_featured');
        });

        Schema::table('gallery_items', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'sort_order']);
            $table->dropIndex('category');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'sort_order']);
            $table->dropIndex('is_featured');
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'sort_order']);
        });

        Schema::table('features', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'sort_order']);
        });

        Schema::table('hero_sections', function (Blueprint $table) {
            $table->dropIndex('is_active');
        });

        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropIndex('status');
            $table->dropIndex('created_at');
        });
    }
};
