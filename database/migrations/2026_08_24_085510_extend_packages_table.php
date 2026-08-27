<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('sort_order');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->string('departure_city')->nullable()->after('meta_description');
            $table->string('airline')->nullable()->after('departure_city');
            $table->string('hotel_madinah')->nullable()->after('airline');
            $table->string('hotel_madinah_distance')->nullable()->after('hotel_madinah');
            $table->string('hotel_madinah_room')->nullable()->after('hotel_madinah_distance');
            $table->string('hotel_makkah')->nullable()->after('hotel_madinah_room');
            $table->string('hotel_makkah_distance')->nullable()->after('hotel_makkah');
            $table->string('hotel_makkah_room')->nullable()->after('hotel_makkah_distance');
            $table->text('flight_notes')->nullable()->after('hotel_makkah_room');
        });
    }

    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn([
                'meta_title', 'meta_description', 'departure_city', 'airline',
                'hotel_madinah', 'hotel_madinah_distance', 'hotel_madinah_room',
                'hotel_makkah', 'hotel_makkah_distance', 'hotel_makkah_room', 'flight_notes',
            ]);
        });
    }
};
