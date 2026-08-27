'use client';

import { Eye, Target } from 'lucide-react';
import { FadeIn } from '@/components/motion';

interface Vision {
    id: number;
    type: 'vision' | 'mission';
    description: string;
}

interface VisionMissionSectionProps {
    visions: Vision[];
}

export function VisionMissionSection({ visions }: VisionMissionSectionProps) {
    if (visions.length === 0) {
        return null;
    }

    const visi = visions.filter((v) => v.type === 'vision');
    const misi = visions.filter((v) => v.type === 'mission');

    return (
        <section className="py-16 lg:py-24 bg-brand-secondary/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                        Visi & Misi
                    </p>
                    <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                        Visi & Misi Kami
                    </h2>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    <FadeIn direction="left" delay={0.1}>
                        <div className="rounded-xl border border-border/50 bg-white p-8 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-emerald/10">
                                <Eye className="h-6 w-6 text-brand-emerald" />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-brand-foreground">
                                Visi
                            </h3>
                            <div className="mt-4 space-y-4">
                                {visi.length > 0 ? (
                                    visi.map((item) => (
                                        <div key={item.id}>
                                            <p className="text-sm text-brand-muted leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-brand-muted italic">
                                        Belum ada visi yang ditambahkan.
                                    </p>
                                )}
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="right" delay={0.2}>
                        <div className="rounded-xl border border-border/50 bg-white p-8 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10">
                                <Target className="h-6 w-6 text-brand-gold" />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-brand-foreground">
                                Misi
                            </h3>
                            <div className="mt-4 space-y-4">
                                {misi.length > 0 ? (
                                    misi.map((item) => (
                                        <div key={item.id}>
                                            <p className="text-sm text-brand-muted leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-brand-muted italic">
                                        Belum ada misi yang ditambahkan.
                                    </p>
                                )}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
