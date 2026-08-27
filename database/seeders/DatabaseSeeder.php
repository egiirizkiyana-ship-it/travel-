<?php

namespace Database\Seeders;

use App\Models\AboutSection;
use App\Models\Destination;
use App\Models\Faq;
use App\Models\Feature;
use App\Models\GalleryItem;
use App\Models\HeroSection;
use App\Models\Package;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\WebsiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::firstOrCreate(
            ['email' => 'admin@havanatravel.co.id'],
            [
                'name' => 'Admin',
                'role' => 'admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Website Settings
        $settings = [
            ['key' => 'company_name', 'value' => 'Havana Travel', 'type' => 'text'],
            ['key' => 'tagline', 'value' => 'Perjalanan Ibadah yang Penuh Makna', 'type' => 'text'],
            ['key' => 'phone', 'value' => '+62 21 1234 5678', 'type' => 'text'],
            ['key' => 'whatsapp', 'value' => '+62 812 3456 7890', 'type' => 'text'],
            ['key' => 'email', 'value' => 'info@havanatravel.co.id', 'type' => 'text'],
            ['key' => 'address', 'value' => 'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta', 'type' => 'textarea'],
            ['key' => 'instagram', 'value' => 'havanatravel', 'type' => 'text'],
            ['key' => 'facebook', 'value' => 'havanatravel', 'type' => 'text'],
            ['key' => 'youtube', 'value' => 'havanatravel', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            WebsiteSetting::create($setting);
        }

        // Hero Section
        $hero = HeroSection::create([
            'eyebrow' => 'Selamat Datang',
            'title' => 'Raih Berkah Umroh Bersama Havana Travel',
            'description' => 'Kami mewujudkan impian Anda untuk menunaikan ibadah umroh dengan pelayanan terbaik, pembimbing berpengalaman, dan perjalanan yang nyaman.',
            'primary_button_text' => 'Lihat Paket',
            'primary_button_url' => '/packages',
            'secondary_button_text' => 'Hubungi Kami',
            'secondary_button_url' => '/contact',
            'background_image' => '/images/hero/hero.jpg',
            'is_active' => true,
        ]);

        // Hero Slides
        $heroSlides = [
            ['image' => '/images/hero/hero.jpg', 'sort_order' => 1],
            ['image' => '/images/gallery/makkah.jpg', 'sort_order' => 2],
            ['image' => '/images/gallery/madinah.jpg', 'sort_order' => 3],
            ['image' => '/images/gallery/jamaah.jpg', 'sort_order' => 4],
        ];

        foreach ($heroSlides as $slide) {
            $hero->slides()->create(array_merge($slide, ['is_active' => true]));
        }

        // About Section
        AboutSection::create([
            'eyebrow' => 'Tentang Kami',
            'title' => 'Havana Travel — Mitra Terpercaya Perjalanan Ibadah',
            'description' => 'Havana Travel adalah perusahaan travel umroh terpercaya yang telah melayani ribuan jamaah dalam perjalanan ibadah mereka. Dengan pengalaman lebih dari 15 tahun, kami berkomitmen memberikan pelayanan terbaik dengan standar kualitas tinggi. Setiap perjalanan dirancang untuk memberikan pengalaman ibadah yang bermakna dan tidak terlupakan.',
            'button_text' => 'Selengkapnya',
            'button_url' => '/about',
            'is_active' => true,
        ]);

        // Features
        $features = [
            [
                'title' => 'Pembimbing Berpengalaman',
                'description' => 'Didampingi oleh pembimbing umroh bersertifikat dan berpengalaman selama perjalanan ibadah Anda.',
                'icon' => 'users',
                'sort_order' => 1,
            ],
            [
                'title' => 'Paket Transparan',
                'description' => 'Semua biaya tercantum jelas tanpa ada biaya tersembunyi. Anda tahu persis apa yang Anda bayar.',
                'icon' => 'dollar',
                'sort_order' => 2,
            ],
            [
                'title' => 'Pendampingan Lengkap',
                'description' => 'Dari keberangkatan hingga kepulangan, tim kami siap membantu Anda selama perjalanan.',
                'icon' => 'heart',
                'sort_order' => 3,
            ],
            [
                'title' => 'Pelayanan Personal',
                'description' => 'Setiap jamaah mendapat perhatian khusus dan pelayanan yang disesuaikan dengan kebutuhan.',
                'icon' => 'shield',
                'sort_order' => 4,
            ],
        ];

        foreach ($features as $feature) {
            Feature::create($feature);
        }

        // Packages
        $packages = [
            [
                'name' => 'Umroh Ekonomis',
                'slug' => 'umroh-ekonomis',
                'duration' => '9 Hari',
                'description' => 'Paket umroh dengan harga terjangkau tanpa mengurangi kenyamanan perjalanan. Cocok untuk jamaah yang ingin berangkat umroh dengan budget terbatas.',
                'price' => 18000000,
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Umroh Reguler',
                'slug' => 'umroh-reguler',
                'duration' => '12 Hari',
                'description' => 'Paket umroh reguler dengan pelayanan lengkap dan harga terjangkau. Cocok untuk jamaah yang ingin menjalani ibadah umroh dengan nyaman.',
                'price' => 25000000,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Umroh Plus',
                'slug' => 'umroh-plus',
                'duration' => '16 Hari',
                'description' => 'Paket umroh dengan tambahan ziarah ke tempat-tempat bersejarah di Makkah dan Madinah. Perjalanan ibadah yang lebih lengkap.',
                'price' => 35000000,
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Umroh VIP',
                'slug' => 'umroh-vip',
                'duration' => '14 Hari',
                'description' => 'Paket umroh premium dengan hotel bintang 5 dekat Masjidil Haram. Nikmati kenyamanan ekstra selama perjalanan ibadah Anda.',
                'price' => 45000000,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Umroh Ramadhan',
                'slug' => 'umroh-ramadhan',
                'duration' => '21 Hari',
                'description' => 'Paket umroh spesial bulan Ramadhan dengan keberkahan ibadah di bulan suci. Nikmati pengalaman berpuasa di tanah suci.',
                'price' => 55000000,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Umroh Premium',
                'slug' => 'umroh-premium',
                'duration' => '18 Hari',
                'description' => 'Paket umroh eksklusif dengan layanan VIP, hotel mewah, dan ziarah lengkap. Pengalaman ibadah premium yang tak terlupakan.',
                'price' => 65000000,
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($packages as $package) {
            Package::create($package);
        }

        // Destinations
        $destinations = [
            [
                'name' => 'Makkah',
                'slug' => 'makkah',
                'description' => 'Kota suci Makkah, tempat lahirnya agama Islam dan kota yang selalu dirindukan oleh setiap muslim untuk menunaikan ibadah haji dan umroh.',
                'image' => '/images/destinations/makkah.jpg',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Madinah',
                'slug' => 'madinah',
                'description' => 'Kota Madinah Al Munawwarah, kota kedua suci Islam yang menjadi tempat bersemayamnya Masjid Nabawi dan makam Rasulullah shallallahu alaihi wasallam.',
                'image' => '/images/destinations/madinah.jpg',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Jeddah',
                'slug' => 'jeddah',
                'description' => 'Kota Jeddah, gerbang utama masuk ke Tanah Suci Makkah. Kota metropolitan yang modern dan menjadi pusat perdagangan Arab Saudi.',
                'image' => '/images/destinations/jeddah.jpg',
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Mina',
                'slug' => 'mina',
                'description' => 'Lembah Mina, tempat dilaksanakannya lempar jumrah. Tempat yang penuh sejarah dalam ibadah haji dan umroh.',
                'image' => '/images/destinations/mina.jpg',
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Arafah',
                'slug' => 'arafah',
                'description' => 'Padang Arafah, tempat wukuf yang merupakan rukun haji. Tempat yang sangat sakral bagi umat Islam.',
                'image' => '/images/destinations/arafah.jpg',
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Jabal Thur',
                'slug' => 'jabal-thur',
                'description' => 'Bukit Thur, tempat Nabi Muhammad shallallahu alaihi wasallam bersembunyi saat hijrah ke Madinah. Tempat bersejarah yang wajib dikunjungi.',
                'image' => '/images/destinations/thur.jpg',
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($destinations as $destination) {
            Destination::create($destination);
        }

        // Gallery Items
        $galleryItems = [
            ['title' => 'Ka\'bah', 'category' => 'makkah', 'sort_order' => 1],
            ['title' => 'Masjidil Haram', 'category' => 'makkah', 'sort_order' => 2],
            ['title' => 'Masjid Nabawi', 'category' => 'madinah', 'sort_order' => 3],
            ['title' => 'Raudhah', 'category' => 'madinah', 'sort_order' => 4],
            ['title' => 'Jamaah Umroh', 'category' => 'jamaah', 'sort_order' => 5],
            ['title' => 'Perjalanan ke Makkah', 'category' => 'jamaah', 'sort_order' => 6],
            ['title' => 'Hotel di Makkah', 'category' => 'hotel', 'sort_order' => 7],
            ['title' => 'Bus Transportasi', 'category' => 'transportation', 'sort_order' => 8],
        ];

        foreach ($galleryItems as $item) {
            GalleryItem::create(array_merge($item, ['image' => '/images/gallery/'.$item['category'].'.jpg', 'is_active' => true]));
        }

        // Testimonials
        $testimonials = [
            [
                'name' => 'Ahmad',
                'city' => 'Jakarta',
                'package' => 'Umroh Reguler',
                'content' => 'Pelayanan Havana Travel sangat memuaskan. Dari awal pendaftaran hingga pulang, semuanya terorganisir dengan baik. Pembimbingnya ramah dan berpengetahuan luas.',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Siti',
                'city' => 'Bandung',
                'package' => 'Umroh VIP',
                'content' => 'Alhamdulillah, perjalanan umroh bersama Havana Travel luar biasa. Hotelnya nyaman dan dekat dengan Masjidil Haram. Sangat recommended!',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Budi',
                'city' => 'Surabaya',
                'package' => 'Umroh Plus',
                'content' => 'Perjalanan umroh plus yang sangat berkesan. Ziarah ke tempat-tempat bersejarah ditambah dengan pelayanan yang prima. Terima kasih Havana Travel.',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Fatimah',
                'city' => 'Yogyakarta',
                'package' => 'Umroh Reguler',
                'content' => 'Saya dan keluarga sangat puas dengan pelayanan Havana Travel. Anak-anak juga nyaman selama perjalanan. Insya Allah mau berangkat lagi.',
                'rating' => 4,
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }

        // FAQs
        $faqs = [
            [
                'question' => 'Berapa lama perjalanan umroh?',
                'answer' => 'Perjalanan umroh biasanya berlangsung selama 9-16 hari tergantung paket yang dipilih. Paket reguler biasanya 12 hari, paket VIP 14 hari, dan paket plus 16 hari.',
                'sort_order' => 1,
            ],
            [
                'question' => 'Apa saja dokumen yang diperlukan untuk umroh?',
                'answer' => 'Dokumen yang diperlukan antara lain: Paspor minimal 6 bulan sebelum keberangkatan, foto terbaru, bukti vaksin, surat kesehatan, dan bukti pembayaran.',
                'sort_order' => 2,
            ],
            [
                'question' => 'Apakah ada cicilan untuk pembayaran umroh?',
                'answer' => 'Ya, kami menyediakan fasilitas cicilan untuk memudahkan jamaah. Cicilan bisa dilakukan dengan kartu kredit atau cicilan langsung ke kantor kami.',
                'sort_order' => 3,
            ],
            [
                'question' => 'Kapan waktu terbaik untuk umroh?',
                'answer' => 'Umroh bisa dilakukan kapan saja sepanjang tahun. Namun, waktu yang paling diminati adalah saat bulan Ramadhan dan musim haji.',
                'sort_order' => 4,
            ],
            [
                'question' => 'Apakah ada pembimbing khusus untuk wanita?',
                'answer' => 'Ya, kami menyediakan pembimbing khusus wanita yang bersertifikat dan berpengalaman untuk mendampingi jamaah wanita selama perjalanan ibadah.',
                'sort_order' => 5,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
