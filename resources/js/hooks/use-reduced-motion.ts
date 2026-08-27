'use client';

import { useEffect, useState } from 'react';

function getInitialValue(): boolean {
    if (typeof window === 'undefined') {
return false;
}

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialValue);

    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

        function handleChange(e: MediaQueryListEvent) {
            setPrefersReducedMotion(e.matches);
        }

        mql.addEventListener('change', handleChange);

        return () => mql.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}
