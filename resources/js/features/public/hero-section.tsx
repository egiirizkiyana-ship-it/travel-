'use client';

import { Hero } from '@/components/public/Hero/Hero';
import type { HeroSection, HeroSlide } from '@/types';

interface HeroSectionProps {
    hero: HeroSection | null;
    heroSlides?: HeroSlide[];
}

export function HeroSection({ hero, heroSlides = [] }: HeroSectionProps) {
    return <Hero hero={hero} heroSlides={heroSlides} />;
}
