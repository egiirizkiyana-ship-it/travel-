'use client';

import { FadeIn } from '@/components/motion';

interface History {
    id: number;
    year: string;
    title: string;
    description: string;
    image?: string;
}

interface HistoryTimelineSectionProps {
    histories: History[];
}

export function HistoryTimelineSection({ histories }: HistoryTimelineSectionProps) {
    if (histories.length === 0) {
        return null;
    }

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                        Sejarah Kami
                    </p>
                    <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                        Perjalanan Kami
                    </h2>
                </div>

                <div className="relative mt-16">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />

                    <div className="space-y-12">
                        {histories.map((item, i) => {
                            const isLeft = i % 2 === 0;

                            return (
                                <div
                                    key={item.id}
                                    className={`relative flex items-start gap-8 ${
                                        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    } flex-col lg:gap-0`}
                                >
                                    <div
                                        className={`w-full lg:w-[calc(50%-2rem)] ${
                                            isLeft ? 'lg:text-right' : 'lg:text-left'
                                        }`}
                                    >
                                        <FadeIn
                                            direction={isLeft ? 'left' : 'right'}
                                            delay={i * 0.1}
                                        >
                                            <div
                                                className={`rounded-xl border border-border/50 bg-white p-6 shadow-sm ${
                                                    isLeft ? 'lg:ml-auto' : 'lg:mr-auto'
                                                } max-w-lg`}
                                            >
                                                <div
                                                    className={`mb-3 inline-flex items-center rounded-full bg-brand-emerald/10 px-3 py-1 ${
                                                        isLeft ? 'lg:float-right lg:ml-3' : ''
                                                    }`}
                                                >
                                                    <span className="text-sm font-bold text-brand-emerald">
                                                        {item.year}
                                                    </span>
                                                </div>
                                                <h3 className="font-heading text-lg font-bold text-brand-foreground clear-both">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                                                    {item.description}
                                                </p>
                                                {item.image && (
                                                    <div className="mt-4 overflow-hidden rounded-lg">
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </FadeIn>
                                    </div>

                                    <div className="absolute left-1/2 top-6 z-10 hidden lg:block">
                                        <div className="h-3 w-3 -translate-x-1/2 rounded-full border-2 border-brand-emerald bg-white" />
                                    </div>

                                    <div className="hidden w-full lg:block lg:w-[calc(50%-2rem)]" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
