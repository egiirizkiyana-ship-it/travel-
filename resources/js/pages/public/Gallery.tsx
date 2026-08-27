'use client';

import { MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { FadeUp } from '@/components/motion';
import { Lightbox } from '@/components/public/Lightbox';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { BreadcrumbsJsonLd } from '@/components/seo/BreadcrumbsJsonLd';
import { SeoHead } from '@/components/seo/SeoHead';
import type { GalleryItem } from '@/types';

interface GalleryCategory {
    value: string;
    label: string;
    count: number;
}

interface GalleryProps {
    gallery: GalleryItem[];
    categories: GalleryCategory[];
    seo: { title: string; description: string; canonical?: string };
}

export default function Gallery({ gallery, categories, seo }: GalleryProps) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filtered = useMemo(() => {
        if (activeCategory === 'all') {
return gallery;
}

        return gallery.filter((item) => item.category === activeCategory);
    }, [gallery, activeCategory]);

    const allCategories = [{ value: 'all', label: 'Semua', count: gallery.length }, ...categories];

    const lightboxImages = filtered.map((item) => ({
        id: item.id,
        image: item.image,
        title: item.title,
        subtitle: categoryLabels[item.category] || item.category,
    }));

    const lightboxCurrentIndex = lightboxIndex !== null
        ? lightboxImages.findIndex((img) => img.id === lightboxIndex)
        : -1;

    return (
        <>
            <SeoHead title={seo.title} description={seo.description} canonical={seo.canonical} />
            <BreadcrumbsJsonLd items={[
                { name: 'Beranda', url: '/' },
                { name: 'Galeri', url: '/gallery' },
            ]} />

            <PublicPageHero
                eyebrow="Galeri"
                title="Galeri Perjalanan"
                description="Melihat kembali momen perjalanan bersama jamaah kami."
            />

            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="flex flex-wrap justify-center gap-2">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setActiveCategory(cat.value)}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                        activeCategory === cat.value
                                            ? 'bg-brand-emerald text-white shadow-md'
                                            : 'bg-brand-secondary text-brand-muted hover:text-brand-foreground border border-border/50'
                                    }`}
                                >
                                    {cat.label}
                                    <span className="ml-1.5 text-xs opacity-70">({cat.count})</span>
                                </button>
                            ))}
                        </div>
                    </FadeUp>

                    <div className="mt-10">
                        {filtered.length === 0 ? (
                            <div className="mt-12 text-center">
                                <MapPin className="mx-auto h-12 w-12 text-brand-muted/30" />
                                <p className="mt-3 text-sm text-brand-muted">
                                    Tidak ada gambar dalam kategori ini.
                                </p>
                            </div>
                        ) : (
                            <EditorialGrid
                                items={filtered}
                                onImageClick={(id) => setLightboxIndex(id)}
                            />
                        )}
                    </div>
                </div>
            </section>

            {lightboxIndex !== null && (
                <Lightbox
                    images={lightboxImages}
                    currentIndex={lightboxCurrentIndex >= 0 ? lightboxCurrentIndex : 0}
                    onClose={() => setLightboxIndex(null)}
                    onPrev={() => {
                        const idx = lightboxCurrentIndex > 0 ? lightboxCurrentIndex - 1 : lightboxImages.length - 1;
                        setLightboxIndex(lightboxImages[idx].id);
                    }}
                    onNext={() => {
                        const idx = lightboxCurrentIndex < lightboxImages.length - 1 ? lightboxCurrentIndex + 1 : 0;
                        setLightboxIndex(lightboxImages[idx].id);
                    }}
                />
            )}
        </>
    );
}

const categoryLabels: Record<string, string> = {
    makkah: 'Makkah',
    madinah: 'Madinah',
    jamaah: 'Jamaah',
    hotel: 'Hotel',
    transportation: 'Transportasi',
    other: 'Lainnya',
};

function EditorialGrid({ items, onImageClick }: { items: GalleryItem[]; onImageClick: (id: number) => void }) {
    return (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
                    <div
                        key={item.id}
                        className="group relative cursor-pointer overflow-hidden rounded-xl"
                        onClick={() => onImageClick(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onImageClick(item.id);
                            }
                        }}
                    >
                        <div className="overflow-hidden aspect-square">
                            <GalleryImage item={item} />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-black/70" />

                        <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-brand-gold">
                                {categoryLabels[item.category] || item.category}
                            </p>
                            <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                                {item.title}
                            </h3>
                        </div>
                    </div>
            ))}
        </div>
    );
}

function GalleryImage({ item }: { item: GalleryItem }) {
    const [imageError, setImageError] = useState(false);

    if (imageError) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
                <MapPin className="h-10 w-10 text-brand-muted/40" />
            </div>
        );
    }

    return (
        <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
    );
}
