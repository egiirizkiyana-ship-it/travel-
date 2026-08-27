'use client';

import { Users, Award, Star, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stats = [
    { icon: Users, value: 10000, suffix: '+', label: 'Jamaah Dilayani' },
    { icon: Award, value: 15, suffix: '+', label: 'Tahun Pengalaman' },
    { icon: Star, value: 4.9, suffix: '', label: 'Rating Pelayanan' },
    { icon: Clock, value: 24, suffix: '/7', label: 'Dukungan Pelanggan' },
];

function useCountUp(target: number, duration: number = 2000, shouldStart: boolean) {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        if (!shouldStart) {
return;
}

        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameRef.current);
    }, [target, duration, shouldStart]);

    return count;
}

function StatItem({ stat, shouldAnimate }: { stat: (typeof stats)[0]; shouldAnimate: boolean }) {
    const count = useCountUp(stat.value, 2000, shouldAnimate);

    return (
        <div className="rounded-xl border border-border/50 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-emerald/10">
                <stat.icon className="h-6 w-6 text-brand-emerald" />
            </div>
            <div className="font-heading text-2xl font-bold text-brand-foreground lg:text-3xl">
                {stat.suffix === '/7'
                    ? `${count}${stat.suffix}`
                    : stat.value % 1 !== 0
                        ? count.toFixed(1)
                        : count.toLocaleString('id-ID')
                }
                {stat.suffix && stat.suffix !== '/7' ? stat.suffix : ''}
            </div>
            <div className="mt-1 text-sm text-brand-muted">{stat.label}</div>
        </div>
    );
}

export function TrustStats() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;

        if (!el) {
return;
}

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldAnimate(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 },
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative z-10 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
                    {stats.map((stat) => (
                        <StatItem key={stat.label} stat={stat} shouldAnimate={shouldAnimate} />
                    ))}
                </div>
            </div>
        </section>
    );
}
