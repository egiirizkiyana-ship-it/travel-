'use client';

import { useForm } from '@inertiajs/react';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Youtube, CheckCircle } from 'lucide-react';
import { FadeUp } from '@/components/motion';
import { FinalCTA } from '@/components/public/cta/FinalCTA';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { BreadcrumbsJsonLd } from '@/components/seo/BreadcrumbsJsonLd';
import { SeoHead } from '@/components/seo/SeoHead';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { Package } from '@/types';

interface ContactSettings {
    company_name: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    instagram: string;
    facebook: string;
    youtube: string;
}

interface ContactProps {
    packages: Pick<Package, 'id' | 'name'>[];
    settings: ContactSettings;
    seo: { title: string; description: string; canonical?: string };
}

export default function Contact({ packages, settings, seo }: ContactProps) {
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        name: '',
        phone: '',
        email: '',
        package_id: '',
        message: '',
    });

    const waUrl = buildWhatsAppUrl(
        settings.whatsapp,
        'Assalamu\'alaikum, saya ingin berkonsultasi mengenai perjalanan Umroh.',
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/contact');
    }

    return (
        <>
            <SeoHead title={seo.title} description={seo.description} canonical={seo.canonical} />
            <BreadcrumbsJsonLd items={[
                { name: 'Beranda', url: '/' },
                { name: 'Kontak', url: '/contact' },
            ]} />

            <PublicPageHero
                eyebrow="Kontak"
                title="Hubungi Kami"
                description="Konsultasi gratis untuk perjalanan ibadah umroh Anda."
            />

            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {wasSuccessful && (
                        <FadeUp>
                            <div className="mb-10 rounded-xl border border-brand-secondary bg-brand-bg p-6 text-center">
                                <CheckCircle className="mx-auto h-12 w-12 text-brand-emerald" />
                                <h3 className="mt-3 font-heading text-lg font-bold text-brand-dark">
                                    Terima kasih.
                                </h3>
                                <p className="mt-1 text-sm text-brand-emerald">
                                    Pertanyaan Anda sudah kami terima. Tim kami akan segera menghubungi Anda.
                                </p>
                                <div className="mt-4 flex items-center justify-center gap-3">
                                    <a
                                        href="/"
                                        className="rounded-lg border border-brand-secondary px-4 py-2 text-sm font-medium text-brand-emerald transition-colors hover:bg-brand-bg"
                                    >
                                        Kembali ke Beranda
                                    </a>
                                    <a
                                        href={waUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-lg bg-brand-emerald px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                                    >
                                        Chat WhatsApp
                                    </a>
                                </div>
                            </div>
                        </FadeUp>
                    )}

                    <div className="grid gap-8 lg:grid-cols-2">
                        <FadeUp>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-border/50">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emerald/10">
                                        <MapPin className="h-5 w-5 text-brand-emerald" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-sm font-bold text-brand-foreground">
                                            Alamat
                                        </h3>
                                        <p className="mt-1 text-sm text-brand-muted">{settings.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-border/50">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emerald/10">
                                        <Phone className="h-5 w-5 text-brand-emerald" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-sm font-bold text-brand-foreground">
                                            Telepon
                                        </h3>
                                        <a
                                            href={`tel:${settings.phone}`}
                                            className="mt-1 text-sm text-brand-muted hover:text-brand-emerald transition-colors"
                                        >
                                            {settings.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-border/50">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emerald/10">
                                        <Mail className="h-5 w-5 text-brand-emerald" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-sm font-bold text-brand-foreground">
                                            Email
                                        </h3>
                                        <a
                                            href={`mailto:${settings.email}`}
                                            className="mt-1 text-sm text-brand-muted hover:text-brand-emerald transition-colors"
                                        >
                                            {settings.email}
                                        </a>
                                    </div>
                                </div>

                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-brand-emerald p-4 text-white font-medium hover:bg-brand-dark transition-colors"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    Konsultasi via WhatsApp
                                </a>

                                <div className="rounded-xl bg-white p-6 border border-border/50">
                                    <h3 className="font-heading text-sm font-bold text-brand-foreground mb-3">
                                        Lokasi Kantor
                                    </h3>
                                    <div className="flex h-40 items-center justify-center rounded-lg bg-brand-secondary/50">
                                        <p className="text-sm text-brand-muted">
                                            Lokasi kantor akan ditampilkan di sini.
                                        </p>
                                    </div>
                                </div>

                                {(settings.instagram || settings.facebook || settings.youtube) && (
                                    <div className="rounded-xl bg-white p-6 border border-border/50">
                                        <h3 className="font-heading text-sm font-bold text-brand-foreground mb-3">
                                            Media Sosial
                                        </h3>
                                        <div className="flex gap-3">
                                            {settings.instagram && (
                                                <a
                                                    href={`https://instagram.com/${settings.instagram}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary text-brand-muted transition-colors hover:bg-brand-emerald hover:text-white"
                                                    aria-label="Instagram"
                                                >
                                                    <Instagram className="h-4 w-4" />
                                                </a>
                                            )}
                                            {settings.facebook && (
                                                <a
                                                    href={`https://facebook.com/${settings.facebook}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary text-brand-muted transition-colors hover:bg-brand-emerald hover:text-white"
                                                    aria-label="Facebook"
                                                >
                                                    <Facebook className="h-4 w-4" />
                                                </a>
                                            )}
                                            {settings.youtube && (
                                                <a
                                                    href={`https://youtube.com/@${settings.youtube}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary text-brand-muted transition-colors hover:bg-brand-emerald hover:text-white"
                                                    aria-label="YouTube"
                                                >
                                                    <Youtube className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.1}>
                            <div className="rounded-xl bg-white p-8 border border-border/50">
                                <h2 className="font-heading text-xl font-bold text-brand-foreground">
                                    Kirim Pertanyaan
                                </h2>
                                <p className="mt-2 text-sm text-brand-muted">
                                    Isi form di bawah ini dan kami akan segera merespons.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-brand-foreground">
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-brand-foreground focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                                            required
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-brand-foreground">
                                            Nomor WhatsApp *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-brand-foreground focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                                            required
                                        />
                                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-brand-foreground">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-brand-foreground focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="package_id" className="block text-sm font-medium text-brand-foreground">
                                            Paket Yang Diminati
                                        </label>
                                        <select
                                            id="package_id"
                                            value={data.package_id}
                                            onChange={(e) => setData('package_id', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-brand-foreground focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                                        >
                                            <option value="">Pilih paket (opsional)</option>
                                            {packages.map((pkg) => (
                                                <option key={pkg.id} value={pkg.id}>
                                                    {pkg.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-brand-foreground">
                                            Pesan *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-brand-foreground focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
                                            required
                                        />
                                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-lg bg-brand-emerald px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
                                    >
                                        {processing ? 'Mengirim...' : 'Kirim Pertanyaan'}
                                    </button>
                                </form>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            <FinalCTA />
        </>
    );
}
