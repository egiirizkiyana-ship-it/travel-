import { Link } from '@inertiajs/react';
import { ArrowRight, Landmark } from 'lucide-react';
import { FadeUp } from '@/components/motion';
import { SeoHead } from '@/components/seo/SeoHead';
import type { Destination } from '@/types';

interface DestinationsProps {
    destinations: Destination[];
    seo: { title: string; description: string };
}

export default function Destinations({ destinations, seo }: DestinationsProps) {
    return (
        <>
            <SeoHead title={seo.title} description={seo.description} canonical="/destinations" />

            {/* Hero */}
            <section className="relative overflow-hidden hero-gradient-animated py-12 lg:py-16">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzRtMC00SDJ2MmgzM3ptMC00SDJ2MmgzM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <FadeUp delay={0}>
                        <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                            DESTINASI
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.15}>
                        <h1 className="mt-3 font-heading text-4xl font-bold text-white lg:text-5xl">
                            Destinasi Suci Kami
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.3}>
                        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                            Jelajahi keindahan dan keberkahan kota-kota suci umat Islam
                        </p>
                    </FadeUp>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {destinations.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-brand-muted text-lg">Belum ada destinasi tersedia.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {destinations.map((dest) => (
                                <Link
                                    key={dest.id}
                                    href={`/destinations/${dest.slug}`}
                                    className="group overflow-hidden rounded-2xl bg-white border border-border/50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="relative h-56 bg-gradient-to-br from-brand-bg to-brand-secondary overflow-hidden">
                                        {dest.image ? (
                                            <img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <Landmark className="h-12 w-12 text-brand-muted" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-heading text-lg font-bold text-brand-foreground group-hover:text-brand-emerald transition-colors">
                                            {dest.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-brand-muted line-clamp-3">
                                            {dest.description}
                                        </p>
                                        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-emerald group-hover:gap-2 transition-all">
                                            Selengkapnya <ArrowRight className="h-4 w-4" />
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
                        Rencanakan Perjalanan Anda
                    </h2>
                    <p className="mt-3 text-white/70">
                        Hubungi kami untuk informasi lebih lanjut tentang destinasi dan paket umroh
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
