'use client';

import { Shield, DollarSign, Heart, Users } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';
import type { Feature } from '@/types';

interface WhyChooseUsProps {
    features: Feature[];
}

const iconMap: Record<string, React.ElementType> = {
    shield: Shield,
    dollar: DollarSign,
    heart: Heart,
    users: Users,
};

export function WhyChooseUs({ features }: WhyChooseUsProps) {
    if (features.length === 0) {
return null;
}

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="text-center">
                        <p className="text-sm font-medium uppercase tracking-wider text-brand-gold">
                            Mengapa Kami
                        </p>
                        <h2 className="mt-2 font-heading text-3xl font-bold text-brand-foreground lg:text-4xl">
                            Keunggulan Havana Travel
                        </h2>
                    </div>
                </FadeUp>

                <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const IconComponent = feature.icon
                            ? iconMap[feature.icon.toLowerCase()] || Shield
                            : Shield;

                        return (
                            <StaggerItem key={feature.id} className="h-full">
                                <div className="h-full rounded-xl bg-white p-6 border border-border/50 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-emerald/10">
                                        <IconComponent className="h-7 w-7 text-brand-emerald" />
                                    </div>
                                    <h3 className="font-heading text-lg font-bold text-brand-foreground">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
}
