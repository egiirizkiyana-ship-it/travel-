import { Link } from '@inertiajs/react';
import { Search, ArrowRight, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { FadeUp } from '@/components/motion';
import { SeoHead } from '@/components/seo/SeoHead';
import type { Package } from '@/types';

interface PackagesProps {
    packages: Package[];
    seo: { title: string; description: string };
}

export default function Packages({ packages, seo }: PackagesProps) {
    const [search, setSearch] = useState('');

    const filtered = packages.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(search.toLowerCase())),
    );

    return (
        <>
            <SeoHead title={seo.title} description={seo.description} canonical="/packages" />

            {/* Hero */}
            <section className="relative overflow-hidden hero-gradient-animated py-12 lg:py-16">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzRtMC00SDJ2MmgzM3ptMC00SDJ2MmgzM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <FadeUp delay={0.3} distance={50}>
                        <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                            PAKET UMROH
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.5} distance={50}>
                        <h1 className="mt-3 font-heading text-4xl font-bold text-white lg:text-5xl">
                            Pilih Paket Terbaik Anda
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.7} distance={50}>
                        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                            Temukan paket umroh terbaik dengan harga terjangkau dan pelayanan terbaik dari Havana Travel
                        </p>
                    </FadeUp>
                </div>
            </section>

            {/* Search */}
            <section className="relative -mt-6 z-10">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-2 shadow-xl border border-border/50">
                        <div className="flex items-center gap-3 px-4">
                            <Search className="h-5 w-5 text-brand-muted" />
                            <input
                                type="text"
                                placeholder="Cari paket umroh..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 py-3 text-sm outline-none placeholder:text-brand-muted"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-brand-muted text-lg">Paket tidak ditemukan.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((pkg) => (
                                <Link
                                    key={pkg.id}
                                    href={`/packages/${pkg.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-border/50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-square w-full bg-gradient-to-br from-brand-bg to-brand-secondary overflow-hidden">
                                        {pkg.image ? (
                                            <img
                                                src={pkg.image}
                                                alt={pkg.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <MapPin className="h-12 w-12 text-brand-muted" />
                                            </div>
                                        )}
                                        {pkg.is_featured && (
                                            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-brand-emerald px-3 py-1 text-xs font-semibold text-white shadow">
                                                <Star className="h-3 w-3 fill-current" />
                                                Pilihan Jamaah
                                            </div>
                                        )}
                                        <div className="absolute bottom-3 right-3 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-brand-dark shadow">
                                            {pkg.duration}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-5">
                                        <h3 className="font-heading text-lg font-bold text-brand-foreground line-clamp-1">
                                            {pkg.name}
                                        </h3>
                                        <p className="mt-2 flex-1 text-sm text-brand-muted line-clamp-2">
                                            {pkg.description}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between pt-4 border-t border-border/30">
                                            <div>
                                                <p className="text-xs text-brand-muted">Mulai dari</p>
                                                <p className="font-heading text-xl font-bold text-brand-emerald">
                                                    {pkg.price
                                                        ? `Rp ${Number(pkg.price).toLocaleString('id-ID')}`
                                                        : 'Hubungi Kami'}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-emerald group-hover:gap-2 transition-all">
                                                Detail <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-brand-emerald py-16">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="font-heading text-3xl font-bold text-white">
                        Butuh Konsultasi?
                    </h2>
                    <p className="mt-3 text-white/70">
                        Tim kami siap membantu Anda memilih paket umroh yang tepat
                    </p>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-lg hover:shadow-xl transition-shadow"
                    >
                        Hubungi Sekarang <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}
