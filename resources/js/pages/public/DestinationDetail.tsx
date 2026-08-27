import { Link } from '@inertiajs/react';
import { MapPin, Clock, ArrowRight, MessageCircle, Landmark } from 'lucide-react';
import { BreadcrumbsJsonLd } from '@/components/seo/BreadcrumbsJsonLd';
import { SeoHead } from '@/components/seo/SeoHead';
import type { Destination, Package } from '@/types';

interface DestinationDetailProps {
    destination: Destination;
    relatedPackages: Package[];
    whatsapp: string;
    seo: { title: string; description: string; image: string | null; canonical?: string };
}

export default function DestinationDetail({ destination, relatedPackages, whatsapp, seo }: DestinationDetailProps) {
    const whatsappText = encodeURIComponent(
        `Assalamu'alaikum, saya ingin informasi lebih lanjut tentang destinasi ${destination.name}.`,
    );
    const cleanPhone = whatsapp.replace(/[^0-9]/g, '');

    return (
        <>
            <SeoHead
                title={seo.title}
                description={seo.description}
                image={seo.image}
                canonical={seo.canonical}
            />
            <BreadcrumbsJsonLd items={[
                { name: 'Beranda', url: '/' },
                { name: 'Destinasi', url: '/destinations' },
                { name: destination.name, url: `/destinations/${destination.slug}` },
            ]} />

            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-brand-muted">
                        <Link href="/" className="hover:text-brand-foreground">Beranda</Link>
                        <span>/</span>
                        <Link href="/destinations" className="hover:text-brand-foreground">Destinasi</Link>
                        <span>/</span>
                        <span className="text-brand-foreground font-medium">{destination.name}</span>
                    </nav>
                </div>
            </div>

            {/* Content - Side by Side */}
            <section className="py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 lg:items-start">
                    {/* Image */}
                    <div className="mx-auto w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-brand-secondary">
                        {destination.image ? (
                            <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <Landmark className="h-16 w-16 text-brand-muted" />
                            </div>
                        )}
                    </div>
                    {/* Text */}
                    <div>
                        <h1 className="font-heading text-3xl lg:text-4xl font-bold text-brand-foreground mb-4">{destination.name}</h1>
                        <p className="text-brand-muted leading-relaxed whitespace-pre-line">{destination.description}</p>
                    </div>
                </div>
            </section>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-2xl font-bold text-brand-foreground mb-8">Paket Umroh Terkait</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedPackages.map((pkg) => (
                                <Link
                                    key={pkg.id}
                                    href={`/packages/${pkg.slug}`}
                                    className="group overflow-hidden rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="relative h-36 bg-gradient-to-br from-brand-bg to-brand-secondary overflow-hidden">
                                        {pkg.image ? (
                                            <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center"><MapPin className="h-8 w-8 text-brand-muted" /></div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-heading text-sm font-bold text-brand-foreground line-clamp-1">{pkg.name}</h3>
                                        <div className="mt-1 flex items-center gap-1 text-xs text-brand-muted"><Clock className="h-3 w-3" /> {pkg.duration}</div>
                                        <p className="mt-2 font-heading text-lg font-bold text-brand-emerald">
                                            {pkg.price ? `Rp ${Number(pkg.price).toLocaleString('id-ID')}` : 'Hubungi Kami'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-brand-emerald py-16">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="font-heading text-3xl font-bold text-white">Tertarik dengan {destination.name}?</h2>
                    <p className="mt-3 text-white/70">Hubungi kami untuk merencanakan perjalanan umroh Anda</p>
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`https://wa.me/${cleanPhone}?text=${whatsappText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <MessageCircle className="h-5 w-5" /> Chat WhatsApp
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                        >
                            Hubungi Kami <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
