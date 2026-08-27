'use client';

import { Link } from '@inertiajs/react';
import { siteConfig } from '@/config/site';

interface HeroContentProps {
    eyebrow?: string | null;
    title: string;
    description?: string | null;
    primaryButtonText?: string | null;
    primaryButtonUrl?: string | null;
    secondaryButtonText?: string | null;
    secondaryButtonUrl?: string | null;
}

const fadeUpStyle = (delay: number): React.CSSProperties => ({
    opacity: 0,
    transform: 'translateY(24px)',
    animation: `heroFadeUp 0.7s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s forwards`,
});

export function HeroContent({
    eyebrow,
    title,
    description,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
}: HeroContentProps) {
    return (
        <>
            <style>{`
                @keyframes heroFadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes heroShimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .hero-shimmer-text {
                    background: linear-gradient(
                        90deg,
                        #ffffff 0%,
                        #ffffff 40%,
                        rgba(200, 150, 62, 0.9) 50%,
                        #ffffff 60%,
                        #ffffff 100%
                    );
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: heroShimmer 4s ease-in-out 1.2s infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-animate { animation: none !important; opacity: 1 !important; transform: none !important; }
                    .hero-shimmer-text { animation: none !important; background: none !important; -webkit-text-fill-color: white !important; }
                }
            `}</style>

            <div className="relative z-10 mx-auto max-w-[900px] px-4 pb-8 text-center sm:px-6 lg:px-8">
                {eyebrow && (
                    <p
                        className="hero-animate mb-4 text-2xl font-normal tracking-wide text-brand-gold sm:text-3xl md:text-4xl"
                        style={{
                            fontFamily: 'var(--font-script)',
                            ...fadeUpStyle(0.15),
                        }}
                    >
                        {eyebrow}
                    </p>
                )}

                <h1
                    className="hero-shimmer-text font-extrabold leading-[0.95]"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        opacity: 0,
                        transform: 'translateY(24px)',
                        animation: `heroFadeUp 0.7s cubic-bezier(0.25, 0.4, 0.25, 1) 0.3s forwards, heroShimmer 4s ease-in-out 1.2s infinite`,
                    }}
                >
                    <span className="hidden sm:inline" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5rem)' }}>
                        {title}
                    </span>
                    <span className="sm:hidden" style={{ fontSize: 'clamp(2rem, 9vw, 3rem)' }}>
                        {title}
                    </span>
                </h1>

                {description && (
                    <p
                        className="hero-animate mx-auto mt-6 max-w-[600px] text-lg font-normal leading-relaxed text-white/80 sm:text-xl"
                        style={{
                            fontFamily: 'var(--font-poppins)',
                            ...fadeUpStyle(0.45),
                        }}
                    >
                        {description}
                    </p>
                )}

                <div
                    className="hero-animate mt-8 flex flex-wrap items-center justify-center gap-4"
                    style={fadeUpStyle(0.6)}
                >
                    {primaryButtonText && primaryButtonUrl && (
                        <Link
                            href={primaryButtonUrl}
                            className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold/90 hover:shadow-xl sm:text-base"
                        >
                            {primaryButtonText}
                        </Link>
                    )}

                    {secondaryButtonText && secondaryButtonUrl && (
                        <Link
                            href={secondaryButtonUrl}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 sm:text-base"
                        >
                            {secondaryButtonText}
                        </Link>
                    )}

                    {!primaryButtonText && !secondaryButtonText && (
                        <>
                            <Link
                                href="/packages"
                                className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold/90 hover:shadow-xl sm:text-base"
                            >
                                Lihat Paket Umrah
                            </Link>
                            <a
                                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 sm:text-base"
                            >
                                Konsultasi Sekarang
                            </a>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
