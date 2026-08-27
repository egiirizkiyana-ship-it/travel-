'use client';

import { Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { FadeIn, PopUp } from '@/components/motion';
import type { AboutSection } from '@/types';

interface AboutProps {
    about: AboutSection | null;
}

const highlights = [
    'Pembimbing umroh berpengalaman',
    'Paket transparan tanpa biaya tersembunyi',
    'Pendampingan selama perjalanan',
    'Pelayanan personal untuk setiap jamaah',
];

const fallbackImages = [
    { src: '/images/gallery/makkah.jpg', alt: "Ka'bah", delay: 0, className: 'col-span-2 row-span-1 aspect-[4/2]' },
    { src: '/images/hero/nabawi.jpg', alt: 'Masjid Nabawi', delay: 0.15, className: 'aspect-square' },
    { src: '/images/gallery/jamaah.jpg', alt: 'Jamaah Umroh', delay: 0.3, className: 'aspect-square' },
    { src: '/images/gallery/hotel.jpg', alt: 'Hotel di Makkah', delay: 0.45, className: 'aspect-square' },
    { src: '/images/gallery/transportation.jpg', alt: 'Transportasi jamaah umroh', delay: 0.6, className: 'aspect-square' },
];

export function AboutSection({ about }: AboutProps) {
    const images = about?.images ?? [];

    function renderImageGrid(imageList: string[]) {
        return (
            <div className="grid grid-cols-3 grid-rows-2 gap-3">
                {imageList.map((src, i) => (
                    <PopUp
                        key={src}
                        delay={i * 0.12}
                        className={
                            i === 0
                                ? 'col-span-2 row-span-1 rounded-xl overflow-hidden aspect-[4/2]'
                                : 'rounded-xl overflow-hidden aspect-square'
                        }
                    >
                        <div className="group relative h-full w-full">
                            <img
                                src={src}
                                alt={`Tentang Havana Travel ${i + 1}`}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                    </PopUp>
                ))}
            </div>
        );
    }

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        {images.length > 0 ? (
                            renderImageGrid(images)
                        ) : (
                            <div className="grid grid-cols-3 grid-rows-2 gap-3">
                                {fallbackImages.map((img) => (
                                    <PopUp
                                        key={img.src}
                                        delay={img.delay}
                                        className={`rounded-xl overflow-hidden ${img.className}`}
                                    >
                                        <div className="group relative h-full w-full">
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>
                                    </PopUp>
                                ))}
                            </div>
                        )}
                    </div>

                    <FadeIn direction="right">
                        <div>
                            {about?.eyebrow && (
                                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-brand-gold">
                                    {about.eyebrow}
                                </p>
                            )}
                            <h2 className="font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                                {about?.title || 'Tentang Havana Travel'}
                            </h2>
                            <p className="mt-4 text-brand-muted leading-relaxed">
                                {about?.description ||
                                    'Havana Travel adalah perusahaan travel umroh terpercaya yang telah melayani ribuan jamaah dalam perjalanan ibadah mereka. Dengan pengalaman lebih dari 15 tahun, kami berkomitmen memberikan pelayanan terbaik.'}
                            </p>

                            <ul className="mt-6 space-y-3">
                                {highlights.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-emerald" />
                                        <span className="text-sm text-brand-muted">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Link
                                    href={about?.button_url || '/about'}
                                    className="inline-flex items-center rounded-lg bg-brand-emerald px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                                >
                                    {about?.button_text || 'Selengkapnya'}
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
