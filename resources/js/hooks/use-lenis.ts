'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (lenisRef.current) {
return;
}

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
return;
}

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);
}
