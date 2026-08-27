'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap } from '@/lib/gsap';
import type { HeroSlide } from '@/types';

interface HeroBackgroundProps {
    slides: HeroSlide[];
    fallbackImage?: string | null;
    onPrev: () => void;
    onNext: () => void;
    onDotClick: (index: number) => void;
    activeIndex: number;
}

export function HeroBackground({
    slides,
    fallbackImage,
    onPrev,
    onNext,
    onDotClick,
    activeIndex,
}: HeroBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const displaySlides = slides.length > 0
        ? slides
        : fallbackImage
            ? [{ id: 0, image: fallbackImage, hero_section_id: 0, sort_order: 0, is_active: true }]
            : [];

    useEffect(() => {
        if (!containerRef.current || prefersReducedMotion || displaySlides.length <= 1) {
            return;
        }

        const container = containerRef.current;
        const bgEl = container.querySelector('[data-hero-bg]');

        if (!bgEl) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.to(bgEl, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, [prefersReducedMotion, displaySlides.length]);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            <div data-hero-bg className="absolute inset-0">
                {displaySlides.map((slide, index) => (
                    <img
                        key={slide.id}
                        src={slide.image}
                        alt=""
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : undefined}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{
                            opacity: index === activeIndex ? 1 : 0,
                            transition: 'opacity 1.5s ease-in-out',
                            willChange: 'opacity',
                        }}
                    />
                ))}

                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {displaySlides.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white shadow-md backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-lg"
                        aria-label="Sebelumnya"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        onClick={onNext}
                        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white shadow-md backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-lg"
                        aria-label="Selanjutnya"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                        {displaySlides.map((slide, i) => (
                            <button
                                key={slide.id}
                                type="button"
                                onClick={() => onDotClick(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    activeIndex === i
                                        ? 'w-8 bg-brand-gold'
                                        : 'w-2 bg-white/40 hover:bg-white/60'
                                }`}
                                aria-label={`Gambar ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
