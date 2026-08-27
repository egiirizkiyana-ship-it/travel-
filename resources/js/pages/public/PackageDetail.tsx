import { Link, router } from '@inertiajs/react';
import {
    Clock, MapPin, Plane, Hotel, ShieldCheck, Check, X,
    ChevronDown, ChevronUp, MessageCircle, Star,
} from 'lucide-react';
import { useState } from 'react';
import { BreadcrumbsJsonLd } from '@/components/seo/BreadcrumbsJsonLd';
import { SeoHead } from '@/components/seo/SeoHead';
import type { Package, Faq } from '@/types';

interface PackageDetailProps {
    package: Package;
    relatedPackages: Package[];
    faqs: Faq[];
    whatsapp: string;
    seo: { title: string; description: string; image: string | null; canonical?: string };
}

function formatPrice(price: string | null): string {
    if (!price) {
return 'Hubungi Kami';
}

    return `Rp ${Number(price).toLocaleString('id-ID')}`;
}

function WhatsAppLink({ phone, packageName }: { phone: string; packageName: string }) {
    const text = encodeURIComponent(
        `Assalamu'alaikum, saya tertarik dengan ${packageName}. Saya ingin informasi lebih lanjut mengenai keberangkatan dan fasilitas.`,
    );
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    return (
        <a
            href={`https://wa.me/${cleanPhone}?text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-emerald px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
            <MessageCircle className="h-5 w-5" />
            Chat WhatsApp
        </a>
    );
}

function InquiryForm({ slug, packageName }: { slug: string; packageName: string }) {
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        router.post(`/packages/${slug}/inquiry`, form, {
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-brand-foreground mb-1">Nama Lengkap *</label>
                <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-brand-foreground mb-1">No. WhatsApp *</label>
                    <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-brand-foreground mb-1">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-foreground mb-1">Pesan</label>
                <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                />
            </div>
            <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-brand-emerald px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-50"
            >
                {submitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
        </form>
    );
}

function FaqAccordion({ faq }: { faq: Faq }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-border/30 last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between py-4 text-left"
            >
                <span className="font-medium text-brand-foreground pr-4">{faq.question}</span>
                {open ? <ChevronUp className="h-5 w-5 shrink-0 text-brand-muted" /> : <ChevronDown className="h-5 w-5 shrink-0 text-brand-muted" />}
            </button>
            {open && (
                <p className="pb-4 text-sm text-brand-muted leading-relaxed">{faq.answer}</p>
            )}
        </div>
    );
}

export default function PackageDetail({ package: pkg, relatedPackages, faqs, whatsapp, seo }: PackageDetailProps) {
    const [inquiryOpen, setInquiryOpen] = useState(false);

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
                { name: 'Paket Umroh', url: '/packages' },
                { name: pkg.name, url: `/packages/${pkg.slug}` },
            ]} />

            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-brand-muted">
                        <Link href="/" className="hover:text-brand-foreground">Beranda</Link>
                        <span>/</span>
                        <Link href="/packages" className="hover:text-brand-foreground">Paket Umroh</Link>
                        <span>/</span>
                        <span className="text-brand-foreground font-medium">{pkg.name}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-gradient-to-br from-brand-dark to-brand-emerald py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
                    <div className="flex flex-wrap items-center gap-3 justify-center mb-3">
                        {pkg.is_featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand-emerald px-3 py-1 text-xs font-semibold text-white">
                                <Star className="h-3 w-3 fill-current" /> Pilihan Jamaah
                            </span>
                        )}
                        <span className="rounded-lg bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                            {pkg.duration}
                        </span>
                    </div>
                    <h1 className="font-heading text-3xl lg:text-4xl font-bold">{pkg.name}</h1>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80 justify-center">
                        {pkg.departure_city && (
                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {pkg.departure_city}</span>
                        )}
                        {pkg.airline && (
                            <span className="flex items-center gap-1"><Plane className="h-4 w-4" /> {pkg.airline}</span>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Overview */}
                            <div>
                                <h2 className="font-heading text-2xl font-bold text-brand-foreground mb-4">Tentang Paket Ini</h2>
                                <p className="text-brand-muted leading-relaxed whitespace-pre-line">{pkg.description}</p>
                            </div>

                            {/* Package Info Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <InfoCard icon={<Clock className="h-5 w-5" />} label="Durasi" value={pkg.duration} />
                                {pkg.departure_city && <InfoCard icon={<MapPin className="h-5 w-5" />} label="Kota Berangkat" value={pkg.departure_city} />}
                                {pkg.airline && <InfoCard icon={<Plane className="h-5 w-5" />} label="Maskapai" value={pkg.airline} />}
                                {pkg.hotel_madinah && <InfoCard icon={<Hotel className="h-5 w-5" />} label="Hotel Madinah" value={pkg.hotel_madinah} />}
                                {pkg.hotel_makkah && <InfoCard icon={<Hotel className="h-5 w-5" />} label="Hotel Makkah" value={pkg.hotel_makkah} />}
                            </div>

                            {/* Facilities */}
                            {pkg.facilities && pkg.facilities.length > 0 && (
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-brand-foreground mb-4">Fasilitas</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {pkg.facilities.map((f) => (
                                            <div key={f.id} className="flex items-start gap-3 rounded-xl bg-brand-bg p-4">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-secondary text-brand-emerald">
                                                    <ShieldCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-brand-foreground text-sm">{f.name}</p>
                                                    {f.description && <p className="text-xs text-brand-muted mt-0.5">{f.description}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Itinerary */}
                            {pkg.itineraries && pkg.itineraries.length > 0 && (
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-brand-foreground mb-4">Jadwal Perjalanan</h2>
                                    <div className="space-y-4">
                                        {pkg.itineraries.map((it) => (
                                            <div key={it.id} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-white text-sm font-bold">
                                                        {it.day_number}
                                                    </div>
                                                    <div className="w-px flex-1 bg-brand-secondary mt-2" />
                                                </div>
                                                <div className="pb-6">
                                                    <h3 className="font-semibold text-brand-foreground">{it.title}</h3>
                                                    {it.location && <p className="text-xs text-brand-muted mt-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" /> {it.location}</p>}
                                                    {it.description && <p className="text-sm text-brand-muted mt-2 leading-relaxed">{it.description}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Hotels */}
                            {(pkg.hotel_madinah || pkg.hotel_makkah) && (
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-brand-foreground mb-4">Informasi Hotel</h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {pkg.hotel_madinah && (
                                            <div className="rounded-xl border border-border/50 p-5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary text-brand-emerald">
                                                        <Hotel className="h-4 w-4" />
                                                    </div>
                                                    <h3 className="font-semibold text-brand-foreground">Madinah</h3>
                                                </div>
                                                <p className="text-sm font-medium">{pkg.hotel_madinah}</p>
                                                {pkg.hotel_madinah_distance && <p className="text-xs text-brand-muted mt-1">Jarak: {pkg.hotel_madinah_distance}</p>}
                                                {pkg.hotel_madinah_room && <p className="text-xs text-brand-muted mt-1">Tipe Kamar: {pkg.hotel_madinah_room}</p>}
                                            </div>
                                        )}
                                        {pkg.hotel_makkah && (
                                            <div className="rounded-xl border border-border/50 p-5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary text-brand-emerald">
                                                        <Hotel className="h-4 w-4" />
                                                    </div>
                                                    <h3 className="font-semibold text-brand-foreground">Makkah</h3>
                                                </div>
                                                <p className="text-sm font-medium">{pkg.hotel_makkah}</p>
                                                {pkg.hotel_makkah_distance && <p className="text-xs text-brand-muted mt-1">Jarak: {pkg.hotel_makkah_distance}</p>}
                                                {pkg.hotel_makkah_room && <p className="text-xs text-brand-muted mt-1">Tipe Kamar: {pkg.hotel_makkah_room}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Included / Not Included */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                {pkg.included && pkg.included.length > 0 && (
                                    <div>
                                        <h3 className="font-heading text-lg font-bold text-brand-foreground mb-3 flex items-center gap-2">
                                            <Check className="h-5 w-5 text-brand-emerald" /> Termasuk
                                        </h3>
                                        <ul className="space-y-2">
                                            {pkg.included.map((item) => (
                                                <li key={item.id} className="flex items-start gap-2 text-sm text-brand-muted">
                                                    <Check className="h-4 w-4 text-brand-emerald mt-0.5 shrink-0" />
                                                    {item.item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                                    <div>
                                        <h3 className="font-heading text-lg font-bold text-brand-foreground mb-3 flex items-center gap-2">
                                            <X className="h-5 w-5 text-red-500" /> Tidak Termasuk
                                        </h3>
                                        <ul className="space-y-2">
                                            {pkg.notIncluded.map((item) => (
                                                <li key={item.id} className="flex items-start gap-2 text-sm text-brand-muted">
                                                    <X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                                                    {item.item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* FAQ */}
                            {faqs.length > 0 && (
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-brand-foreground mb-4">Pertanyaan Umum</h2>
                                    <div className="divide-y divide-border/30 rounded-xl border border-border/50 px-6">
                                        {faqs.map((faq) => <FaqAccordion key={faq.id} faq={faq} />)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Price Card */}
                                <div className="rounded-2xl border border-border/50 bg-white p-6 shadow-sm">
                                    <p className="text-sm text-brand-muted">Mulai dari</p>
                                            <p className="font-heading text-3xl font-bold text-brand-emerald mt-1">
                                        {formatPrice(pkg.price)}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-brand-muted">
                                        <Clock className="h-4 w-4" />
                                        {pkg.duration}
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <WhatsAppLink phone={whatsapp} packageName={pkg.name} />
                                        <button
                                            onClick={() => setInquiryOpen(!inquiryOpen)}
                                                className="w-full rounded-xl border border-brand-emerald px-6 py-3.5 text-sm font-semibold text-brand-emerald hover:bg-brand-bg transition-colors"
                                        >
                                            Kirim Pesan
                                        </button>
                                    </div>
                                </div>

                                {/* Inquiry Form */}
                                {inquiryOpen && (
                                    <div className="rounded-2xl border border-border/50 bg-white p-6 shadow-sm">
                                        <h3 className="font-heading text-lg font-bold text-brand-foreground mb-4">Kirim Pesan</h3>
                                        <InquiryForm slug={pkg.slug} packageName={pkg.name} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-2xl font-bold text-brand-foreground mb-8">Paket Lainnya</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedPackages.map((rp) => (
                                <Link
                                    key={rp.id}
                                    href={`/packages/${rp.slug}`}
                                    className="group overflow-hidden rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="relative aspect-square w-full bg-gradient-to-br from-brand-bg to-brand-secondary overflow-hidden">
                                        {rp.image ? (
                                            <img src={rp.image} alt={rp.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center"><MapPin className="h-8 w-8 text-brand-muted" /></div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-heading text-sm font-bold text-brand-foreground line-clamp-1">{rp.name}</h3>
                                        <div className="mt-1 flex items-center gap-1 text-xs text-brand-muted"><Clock className="h-3 w-3" /> {rp.duration}</div>
                                        <p className="mt-2 font-heading text-lg font-bold text-brand-emerald">
                                            {rp.price ? `Rp ${Number(rp.price).toLocaleString('id-ID')}` : 'Hubungi Kami'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/50 p-4 lg:hidden safe-area-inset-bottom">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <p className="text-xs text-brand-muted">Mulai dari</p>
                        <p className="font-heading text-lg font-bold text-brand-emerald">{formatPrice(pkg.price)}</p>
                    </div>
                    <WhatsAppLink phone={whatsapp} packageName={pkg.name} />
                </div>
            </div>
        </>
    );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="rounded-xl bg-gray-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary text-brand-emerald mb-2">
                {icon}
            </div>
            <p className="text-xs text-brand-muted">{label}</p>
            <p className="mt-0.5 text-sm font-semibold text-brand-foreground">{value}</p>
        </div>
    );
}
