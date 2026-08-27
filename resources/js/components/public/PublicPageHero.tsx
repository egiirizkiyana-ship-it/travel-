'use client';

import { FadeUp } from '@/components/motion';

interface PublicPageHeroProps {
    eyebrow: string;
    title: string;
    description?: string;
}

export function PublicPageHero({ eyebrow, title, description }: PublicPageHeroProps) {
    return (
        <section className="relative overflow-hidden hero-gradient-animated py-12 lg:py-16">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzRtMC00SDJ2MmgzM3ptMC00SDJ2MmgzM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
            </div>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <FadeUp delay={0.3} distance={50}>
                    <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                        {eyebrow}
                    </p>
                </FadeUp>
                <FadeUp delay={0.5} distance={50}>
                    <h1 className="mt-3 font-heading text-4xl font-bold text-white lg:text-5xl">
                        {title}
                    </h1>
                </FadeUp>
                {description && (
                    <FadeUp delay={0.7} distance={50}>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
                            {description}
                        </p>
                    </FadeUp>
                )}
            </div>
        </section>
    );
}
