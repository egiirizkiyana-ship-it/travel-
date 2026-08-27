'use client';

import { Star } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';
import { FinalCTA } from '@/components/public/cta/FinalCTA';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { TestimonialCard } from '@/components/public/TestimonialCard';
import { BreadcrumbsJsonLd } from '@/components/seo/BreadcrumbsJsonLd';
import { SeoHead } from '@/components/seo/SeoHead';
import type { Testimonial } from '@/types';

interface TestimonialsProps {
    testimonials: Testimonial[];
    stats: {
        average_rating: number;
        total: number;
    };
    seo: { title: string; description: string; canonical?: string };
}

export default function Testimonials({ testimonials, stats, seo }: TestimonialsProps) {
    return (
        <>
            <SeoHead title={seo.title} description={seo.description} canonical={seo.canonical} />
            <BreadcrumbsJsonLd items={[
                { name: 'Beranda', url: '/' },
                { name: 'Testimoni', url: '/testimonials' },
            ]} />

            <PublicPageHero
                eyebrow="Testimoni"
                title="Kata Mereka tentang Kami"
                description="Testimoni jamaah yang telah menunaikan ibadah umroh bersama Havana Travel."
            />

            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {stats.total > 0 && (
                        <FadeUp>
                            <div className="mb-12 flex items-center justify-center gap-6 rounded-xl bg-white border border-border/50 p-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Star className="h-6 w-6 fill-brand-gold text-brand-gold" />
                                        <span className="font-heading text-3xl font-bold text-brand-foreground">
                                            {stats.average_rating}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-brand-muted">Rating Rata-rata</p>
                                </div>
                                <div className="h-12 w-px bg-border/50" />
                                <div className="text-center">
                                    <span className="font-heading text-3xl font-bold text-brand-foreground">
                                        {stats.total}
                                    </span>
                                    <p className="mt-1 text-sm text-brand-muted">Total Testimoni</p>
                                </div>
                            </div>
                        </FadeUp>
                    )}

                    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <StaggerItem key={testimonial.id}>
                                <TestimonialCard testimonial={testimonial} variant="full" />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {testimonials.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-brand-muted">Belum ada testimoni saat ini.</p>
                        </div>
                    )}
                </div>
            </section>

            <FinalCTA />
        </>
    );
}
