'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import type { HeroSection, HeroSlide } from '@/types';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';

interface HeroProps {
    hero: HeroSection | null;
    heroSlides?: HeroSlide[];
}

const SLIDESHOW_INTERVAL = 6000;

export function Hero({ hero, heroSlides = [] }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const slides = heroSlides.length > 0 ? heroSlides : [];
    const hasSlideshow = slides.length > 1;

    const slideNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const slidePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    useEffect(() => {
        if (!hasSlideshow) {
            return;
        }

        intervalRef.current = setInterval(slideNext, SLIDESHOW_INTERVAL);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [hasSlideshow, slideNext]);

    if (!hero) {
        return (
            <section className="relative flex min-h-[80vh] items-center justify-center bg-brand-emerald pb-20">
                <div className="text-center">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-gold">
                        Selamat Datang
                    </p>
                    <h1 className="mt-4 font-heading text-4xl font-bold text-white sm:text-6xl">
                        Havana Travel
                    </h1>
                    <p className="mt-4 text-lg text-white/80">{siteConfig.tagline}</p>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[90svh] items-center justify-center overflow-hidden pb-20 sm:min-h-[100svh]"
        >
            <HeroBackground
                slides={slides}
                fallbackImage={hero.background_image}
                onPrev={slidePrev}
                onNext={slideNext}
                onDotClick={goToSlide}
                activeIndex={currentIndex}
            />

            <HeroContent
                eyebrow={hero.eyebrow}
                title={hero.title}
                description={hero.description}
                primaryButtonText={hero.primary_button_text}
                primaryButtonUrl={hero.primary_button_url}
                secondaryButtonText={hero.secondary_button_text}
                secondaryButtonUrl={hero.secondary_button_url}
            />
        </section>
    );
}
