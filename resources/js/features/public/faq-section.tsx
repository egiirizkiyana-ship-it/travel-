'use client';

import { Link } from '@inertiajs/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { FadeUp } from '@/components/motion';
import type { Faq } from '@/types';

interface FaqProps {
    faqs: Faq[];
}

export function FaqSection({ faqs }: FaqProps) {
    const [openId, setOpenId] = useState<number | null>(null);

    if (faqs.length === 0) {
        return null;
    }

    return (
        <section id="faq" className="py-16 lg:py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center">
                        <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                            FAQ
                        </p>
                        <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                    </div>
                </FadeUp>

                <FadeUp delay={0.2}>
                    <div className="mt-12 space-y-3">
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

                <FadeUp delay={0.3}>
                    <div className="mt-10 text-center">
                        <Link
                            href="/faq"
                            className="inline-flex items-center gap-1 text-sm font-medium text-brand-emerald transition-colors hover:text-brand-dark"
                        >
                            Lihat Semua FAQ
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
