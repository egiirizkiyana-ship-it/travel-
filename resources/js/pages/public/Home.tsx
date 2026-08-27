'use client';

import { FinalCTA } from '@/components/public/cta/FinalCTA';
import { HorizontalGallery } from '@/components/public/HorizontalGallery/HorizontalGallery';
import { SeoHead } from '@/components/seo/SeoHead';
import { AboutSection as AboutSec } from '@/features/public/about-section';
import { DestinationsSection } from '@/features/public/destinations-section';
import { FaqSection } from '@/features/public/faq-section';
import { HeroSection } from '@/features/public/hero-section';
import { JourneySection } from '@/features/public/journey-section';
import { PackagesSection } from '@/features/public/packages-section';
import { TestimonialsSection } from '@/features/public/testimonials-section';
import { TrustStats } from '@/features/public/trust-stats';
import { WhyChooseUs } from '@/features/public/why-choose-us';
import type {
    HeroSection as HeroSectionType,
    HeroSlide,
    AboutSection,
    Feature,
    Package,
    Destination,
    GalleryItem,
    Testimonial,
    Faq,
} from '@/types';

interface HomeProps {
    hero: HeroSectionType | null;
    heroSlides: HeroSlide[];
    about: AboutSection | null;
    features: Feature[];
    featuredPackages: Package[];
    featuredDestinations: Destination[];
    gallery: GalleryItem[];
    featuredTestimonials: Testimonial[];
    faqs: Faq[];
    seo: { title: string; description: string; image: string | null };
}

export default function Home({
    hero,
    heroSlides,
    about,
    features,
    featuredPackages,
    featuredDestinations,
    gallery,
    featuredTestimonials,
    faqs,
    seo,
}: HomeProps) {
    return (
        <>
            <SeoHead title={seo.title} description={seo.description} image={seo.image} canonical="/" />

            <HeroSection hero={hero} heroSlides={heroSlides} />
            <TrustStats />
            <AboutSec about={about} />
            <WhyChooseUs features={features} />
            <JourneySection />
            <PackagesSection packages={featuredPackages} />
            <DestinationsSection destinations={featuredDestinations} />
            <HorizontalGallery images={gallery} />
            <TestimonialsSection testimonials={featuredTestimonials} />
            <FaqSection faqs={faqs} />
            <FinalCTA />
        </>
    );
}
