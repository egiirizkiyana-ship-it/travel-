'use client';

import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';
import { TestimonialCard } from '@/components/public/TestimonialCard';
import type { Testimonial } from '@/types';

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsProps) {
    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-16 lg:py-24 bg-brand-secondary/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center">
                        <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                            Testimoni
                        </p>
                        <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                            Kata Mereka tentang Kami
                        </h2>
                    </div>
                </FadeUp>

                <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <StaggerItem key={testimonial.id}>
                            <TestimonialCard testimonial={testimonial} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeUp delay={0.3}>
                    <div className="mt-10 text-center">
                        <Link
                            href="/testimonials"
                            className="inline-flex items-center gap-1 text-sm font-medium text-brand-emerald transition-colors hover:text-brand-dark"
                        >
                            Lihat Semua Testimoni
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
