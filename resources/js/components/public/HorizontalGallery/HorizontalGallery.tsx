'use client';

import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Lightbox } from '@/components/public/Lightbox';
import type { GalleryItem } from '@/types';
import { GalleryCard } from './GalleryCard';

interface HorizontalGalleryProps {
    images: GalleryItem[];
}

function useVisibleCount(): number {
    const [count, setCount] = useState(3);

    useEffect(() => {
        function update() {
            const w = window.innerWidth;

            if (w < 640) {
                setCount(1);
            } else if (w < 1024) {
                setCount(2);
            } else {
                setCount(3);
            }
        }

        update();
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    }, []);

    return count;
}

const GAP_PX = 16;
const CARD_HEIGHT = 380;
const SLIDE_INTERVAL = 5000;

export function HorizontalGallery({ images }: HorizontalGalleryProps) {
    const visibleCount = useVisibleCount();
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(() => images.length);
    const [isPaused, setIsPaused] = useState(false);
    const [isWrapping, setIsWrapping] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const totalImages = images.length;
    const duplicated = [...images, ...images, ...images];

    const cardWidth = containerWidth > 0
        ? (containerWidth - GAP_PX * (visibleCount - 1)) / visibleCount
        : 0;

    const slideStep = cardWidth + GAP_PX;

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const slideNext = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev + 1 >= totalImages * 2) {
                return totalImages;
            }

            return prev + 1;
        });
    }, [totalImages]);

    const slidePrev = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev - 1 < totalImages) {
                return totalImages * 2 - 1;
            }

            return prev - 1;
        });
    }, [totalImages]);

    useEffect(() => {
        if (isWrapping) {
            const id = requestAnimationFrame(() => {
                setIsWrapping(false);
            });

            return () => cancelAnimationFrame(id);
        }
    }, [isWrapping]);

    useEffect(() => {
        if (isPaused) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            return;
        }

        intervalRef.current = setInterval(slideNext, SLIDE_INTERVAL);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, slideNext]);

    const goTo = useCallback((index: number) => {
        setIsWrapping(true);
        setCurrentIndex(index);
    }, []);

    const translateX = -(currentIndex * slideStep);

    const lightboxImages = images.map((img) => ({ id: img.id, image: img.image, title: img.title }));
    const lightboxCurrentIndex = lightboxIndex !== null
        ? lightboxImages.findIndex((img) => img.id === lightboxIndex)
        : -1;

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-gold">
                        Perjalanan Yang Berkesan
                    </p>
                    <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                        Setiap Langkah Menjadi Sebuah Kenangan
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-brand-muted">
                        Potret perjalanan dan pengalaman jamaah dalam menunaikan ibadah Umrah.
                    </p>
                </div>
            </div>

            <div
                className="relative mx-4 sm:mx-6 lg:mx-8"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    ref={containerRef}
                    className="overflow-hidden"
                >
                    <div
                        className="flex select-none"
                        style={{
                            gap: `${GAP_PX}px`,
                            transform: `translateX(${translateX}px)`,
                            transition: isWrapping ? 'none' : 'transform 0.5s ease',
                            willChange: 'transform',
                        }}
                    >
                        {duplicated.map((item, index) => (
                            <div
                                key={`gallery-${item.id}-${index}`}
                                className="shrink-0"
                                style={{
                                    width: cardWidth > 0 ? `${cardWidth}px` : '320px',
                                    height: `${CARD_HEIGHT}px`,
                                }}
                            >
                                <GalleryCard item={item} onClick={() => setLightboxIndex(item.id)} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={slidePrev}
                    className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-foreground shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                    aria-label="Sebelumnya"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    onClick={slideNext}
                    className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-foreground shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                    aria-label="Selanjutnya"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="mx-auto mt-6 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
                <div className="flex gap-2">
                    {images.map((_, i) => {
                        const activeIndex = currentIndex % totalImages;

                        return (
                            <button
                                key={`dot-${i}`}
                                type="button"
                                onClick={() => {
                                    goTo(images.length + i);
                                    setIsPaused(true);
                                    setTimeout(() => setIsPaused(false), SLIDE_INTERVAL);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    activeIndex === i
                                        ? 'w-8 bg-brand-emerald'
                                        : 'w-2 bg-brand-muted/30 hover:bg-brand-muted/50'
                                }`}
                                aria-label={`Gambar ${i + 1}`}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand-emerald transition-colors hover:text-brand-dark"
                    >
                        Lihat Semua Galeri
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

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
        </section>
    );
}
