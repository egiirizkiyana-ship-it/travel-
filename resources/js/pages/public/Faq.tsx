'use client';

import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { FadeUp } from '@/components/motion';
import { FinalCTA } from '@/components/public/cta/FinalCTA';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { BreadcrumbsJsonLd } from '@/components/seo/BreadcrumbsJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import { SeoHead } from '@/components/seo/SeoHead';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { Faq } from '@/types';

interface FaqProps {
    faqs: Faq[];
    seo: { title: string; description: string; canonical?: string };
    structuredData: {
        '@context': string;
        '@type': string;
        mainEntity: Array<{
            '@type': string;
            name: string;
            acceptedAnswer: { '@type': string; text: string };
        }>;
    } | null;
}

export default function Faq({ faqs, seo, structuredData }: FaqProps) {
    const [openId, setOpenId] = useState<number | null>(null);

    const waUrl = buildWhatsAppUrl(
        siteConfig.whatsapp,
        'Assalamu\'alaikum, saya ingin bertanya seputar perjalanan Umroh.',
    );

    return (
        <>
            <SeoHead title={seo.title} description={seo.description} canonical={seo.canonical} />
            <BreadcrumbsJsonLd items={[
                { name: 'Beranda', url: '/' },
                { name: 'FAQ', url: '/faq' },
            ]} />
            {structuredData && <JsonLd data={structuredData} />}

            <PublicPageHero
                eyebrow="FAQ"
                title="Pertanyaan yang Sering Ditanyakan"
                description="Temukan jawaban atas pertanyaan umum seputar perjalanan umroh."
            />

            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {faqs.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-brand-muted">Belum ada pertanyaan saat ini.</p>
                        </div>
                    ) : (
                        <FadeUp>
                            <div className="space-y-3">
                                {faqs.map((faq) => (
                                    <div
                                        key={faq.id}
                                        className="rounded-xl border border-border/50 bg-white overflow-hidden transition-shadow duration-300 hover:shadow-sm"
                                    >
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                                            onClick={() =>
                                                setOpenId(openId === faq.id ? null : faq.id)
                                            }
                                            aria-expanded={openId === faq.id}
                                        >
                                            <span className="font-heading text-sm font-semibold text-brand-foreground">
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                className={`h-5 w-5 shrink-0 text-brand-muted transition-transform duration-300 ease-in-out ${
                                                    openId === faq.id ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        <div
                                            className="grid transition-all duration-300 ease-in-out"
                                            style={{
                                                gridTemplateRows: openId === faq.id ? '1fr' : '0fr',
                                            }}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="px-6 pb-4">
                                                    <p className="text-sm text-brand-muted leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeUp>
                    )}

                    <FadeUp delay={0.2}>
                        <div className="mt-12 text-center">
                            <p className="text-sm text-brand-muted">
                                Masih punya pertanyaan? Hubungi kami langsung.
                            </p>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-emerald px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Tanya via WhatsApp
                            </a>
                        </div>
                    </FadeUp>
                </div>
            </section>

            <FinalCTA />
        </>
    );
}
