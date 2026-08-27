'use client';

import { FileText, Plane, MapPin, Hotel } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FadeUp } from '@/components/motion';

const steps = [
    {
        icon: FileText,
        step: '01',
        title: 'Konsultasi',
        description: 'Hubungi kami untuk konsultasi gratis mengenai paket umroh yang sesuai dengan kebutuhan Anda.',
    },
    {
        icon: Plane,
        step: '02',
        title: 'Pendaftaran',
        description: 'Daftarkan diri Anda dan lengkapi dokumen yang diperlukan untuk perjalanan umroh.',
    },
    {
        icon: MapPin,
        step: '03',
        title: 'Perjalanan',
        description: 'Berangkat ke Tanah Suci dengan pendampingan penuh dari tim profesional kami.',
    },
    {
        icon: Hotel,
        step: '04',
        title: 'Ibadah',
        description: 'Jalani ibadah umroh dengan khusyuk dengan panduan dari pembimbing berpengalaman.',
    },
];

export function JourneySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [linePercent, setLinePercent] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());

    const updateLine = useCallback(() => {
        const el = sectionRef.current;

        if (!el) {
            return;
        }

        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        const start = viewportHeight * 0.7;
        const progress = (start - sectionTop) / sectionHeight;

        setLinePercent(Math.min(100, Math.max(0, progress * 100)));
    }, []);

    const updateVisibleSteps = useCallback(() => {
        const el = sectionRef.current;

        if (!el) {
            return;
        }

        const stepEls = el.querySelectorAll('[data-step-index]');
        const viewportHeight = window.innerHeight;
        const newVisible = new Set<number>();

        stepEls.forEach((stepEl) => {
            const rect = stepEl.getBoundingClientRect();
            const midPoint = rect.top + rect.height / 2;

            if (midPoint < viewportHeight * 0.75 && midPoint > 0) {
                newVisible.add(Number(stepEl.getAttribute('data-step-index')));
            }
        });

        setVisibleSteps(newVisible);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            updateLine();
            updateVisibleSteps();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, [updateLine, updateVisibleSteps]);

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center">
                        <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                            Perjalanan Anda
                        </p>
                        <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                            Langkah-Langkah Perjalanan
                        </h2>
                    </div>
                </FadeUp>

                <div ref={sectionRef} className="relative mt-12">
                    <div
                        data-timeline-line
                        className="absolute left-0 top-0 hidden h-full w-px bg-border lg:left-1/2 lg:block"
                    >
                        <div
                            className="w-full bg-brand-emerald transition-[height] duration-100 ease-out"
                            style={{ height: `${linePercent}%` }}
                        />
                    </div>

                    <div className="space-y-8 lg:space-y-0">
                        {steps.map((step, index) => (
                            <FadeUp key={step.step} delay={index * 0.15}>
                                <div
                                    data-step-index={index}
                                    className={`relative flex flex-col items-center gap-6 lg:flex-row ${
                                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    }`}
                                >
                                    <div
                                        className={`w-full lg:w-1/2 ${
                                            index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'
                                        }`}
                                    >
                                        <div
                                            className={`inline-flex ${
                                                index % 2 === 0 ? 'lg:ml-auto' : ''
                                            }`}
                                        >
                                            <span className="font-heading text-5xl font-bold text-brand-emerald/70">
                                                {step.step}
                                            </span>
                                        </div>
                                        <h3 className="mt-2 font-heading text-xl font-bold text-brand-foreground">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    <div
                                        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-emerald text-white shadow-lg transition-all duration-500 ${
                                            visibleSteps.has(index)
                                                ? 'scale-100 opacity-100'
                                                : 'scale-75 opacity-40'
                                        }`}
                                    >
                                        <step.icon className="h-5 w-5" />
                                    </div>

                                    <div className="hidden w-1/2 lg:block" />
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
