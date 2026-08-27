'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { FadeUp } from '@/components/motion';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function CTASection() {
    const { site } = usePage().props;
    const whatsapp = site?.whatsapp || siteConfig.whatsapp;
    const waUrl = buildWhatsAppUrl(whatsapp, 'Assalamu\'alaikum, saya ingin berkonsultasi mengenai perjalanan Umroh.');

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="overflow-hidden rounded-2xl bg-brand-emerald px-6 py-12 text-center sm:px-12 lg:px-16">
                        <h2 className="font-heading text-3xl font-bold text-white lg:text-4xl">
                            Siap untuk Memulai Perjalanan Ibadah?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-white/80">
                            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran
                            terbaik untuk perjalanan umroh Anda.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-gold/90"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Chat WhatsApp
                            </a>
                            <a
                                href={`tel:${siteConfig.phone}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                <Phone className="h-5 w-5" />
                                Hubungi Kami
                            </a>
                        </div>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
