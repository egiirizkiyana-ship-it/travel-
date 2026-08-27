'use client';

import { Link } from '@inertiajs/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Destination } from '@/types';

interface DestinationsProps {
    destinations: Destination[];
}

export function DestinationsSection({ destinations }: DestinationsProps) {
    if (destinations.length === 0) {
return null;
}

    return (
        <section className="py-16 lg:py-24 bg-brand-secondary/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center">
                        <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                            Destinasi
                        </p>
                        <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                            Destinasi Suci Kami
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
                            Jelajahi destinasi suci yang akan Anda kunjungi dalam perjalanan
                            ibadah umroh.
                        </p>
                    </div>
                </FadeUp>

                <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((dest) => (
                        <StaggerItem key={dest.id}>
                            <Link
                                href={`/destinations/${dest.slug}`}
                                className="group block overflow-hidden rounded-xl bg-white border border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="relative h-56 bg-brand-secondary overflow-hidden">
                                    {dest.image ? (
                                        <DestinationImage src={dest.image} alt={dest.name} />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-brand-muted">
                                                <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                                                    <span className="text-xl">🕌</span>
                                                </div>
                                                <p className="text-sm font-medium">{dest.name}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-heading text-lg font-bold text-brand-foreground group-hover:text-brand-emerald transition-colors">
                                        {dest.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-brand-muted line-clamp-2">
                                        {dest.description}
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-emerald">
                                        Selengkapnya
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

function DestinationImage({ src, alt }: { src: string; alt: string }) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-secondary">
                <MapPin className="h-10 w-10 text-brand-muted/40" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="eager"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
    );
}
