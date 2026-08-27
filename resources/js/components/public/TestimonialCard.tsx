'use client';

import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
    testimonial: Testimonial;
    variant?: 'compact' | 'full';
}

export function TestimonialCard({ testimonial, variant = 'compact' }: TestimonialCardProps) {
    return (
        <div className={`flex h-full flex-col rounded-xl bg-white border border-border/50 ${variant === 'full' ? 'p-8' : 'p-6'}`}>
            <Quote className={`text-brand-gold/30 ${variant === 'full' ? 'mb-4 h-10 w-10' : 'mb-3 h-8 w-8'}`} />
            <p className={`flex-1 text-brand-muted leading-relaxed ${variant === 'full' ? 'text-base' : 'text-sm'}`}>
                &ldquo;{testimonial.content}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${
                            i < testimonial.rating
                                ? 'fill-brand-gold text-brand-gold'
                                : 'text-brand-muted/30'
                        }`}
                    />
                ))}
            </div>
            <div className={`mt-4 flex items-center gap-3 border-t border-border/50 pt-4 ${variant === 'full' ? 'mt-6 pt-6' : ''}`}>
                {testimonial.avatar ? (
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-emerald/10 font-heading text-sm font-bold text-brand-emerald">
                        {testimonial.name.charAt(0)}
                    </div>
                )}
                <div>
                    <p className="text-sm font-semibold text-brand-foreground">
                        {testimonial.name}
                    </p>
                    <p className="text-xs text-brand-muted">
                        {testimonial.city}
                        {testimonial.package && ` • ${testimonial.package}`}
                    </p>
                </div>
            </div>
        </div>
    );
}
