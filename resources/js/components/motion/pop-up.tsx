'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface PopUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function PopUp({
    children,
    delay = 0,
    duration = 0.6,
    className,
}: PopUpProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const hasMounted = useRef(false);

    useEffect(() => {
        const el = ref.current;

        if (!el) {
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (mediaQuery.matches) {
            if (!hasMounted.current) {
                hasMounted.current = true;
            }

            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 },
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    const shouldShow = isVisible || (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: shouldShow ? 1 : 0,
                transform: shouldShow ? 'scale(1)' : 'scale(0.8)',
                transition: `opacity ${duration}s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}
