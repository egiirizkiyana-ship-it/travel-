'use client';

import { Link } from '@inertiajs/react';
import { Clock, ArrowRight } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Package } from '@/types';

interface PackagesProps {
    packages: Package[];
}

export function PackagesSection({ packages }: PackagesProps) {
    if (packages.length === 0) {
return null;
}

    return (
        <section className="py-16 lg:py-24 bg-brand-secondary/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center">
                        <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                            Paket Umroh
                        </p>
                        <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                            Pilih Paket Terbaik Anda
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
                            Kami menawarkan berbagai paket umroh yang disesuaikan dengan kebutuhan
                            dan budget Anda.
                        </p>
                    </div>
                </FadeUp>

                <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {packages.map((pkg) => (
                        <StaggerItem key={pkg.id}>
                            <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white border border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                <div className="relative aspect-square w-full bg-brand-secondary overflow-hidden">
                                    {pkg.image ? (
                                        <img
                                            src={pkg.image}
                                            alt={pkg.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <div className="text-center text-brand-muted">
                                                <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                                                    <span className="text-lg">✈️</span>
                                                </div>
                                                <p className="text-xs">{pkg.name}</p>
                                            </div>
                                        </div>
                                    )}
                                    {pkg.is_featured && (
                                        <div className="absolute top-3 left-3 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-white">
                                            Populer
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="font-heading text-lg font-bold text-brand-foreground">
                                        {pkg.name}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-1.5 text-sm text-brand-muted">
                                        <Clock className="h-4 w-4" />
                                        {pkg.duration}
                                    </div>
                                    <p className="mt-3 flex-1 text-sm text-brand-muted line-clamp-2">
                                        {pkg.description}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-brand-muted">Mulai dari</p>
                                            <p className="font-heading text-xl font-bold text-brand-emerald">
                                                Rp {Number(pkg.price).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/packages/${pkg.slug}`}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-brand-emerald transition-colors hover:text-brand-dark"
                                        >
                                            Detail
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeUp delay={0.3}>
                    <div className="mt-10 text-center">
                        <Link
                            href="/packages"
                            className="inline-flex items-center rounded-lg border border-brand-emerald px-6 py-3 text-sm font-semibold text-brand-emerald transition-colors hover:bg-brand-emerald hover:text-white"
                        >
                            Lihat Semua Paket
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
