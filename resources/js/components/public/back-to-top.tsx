'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Kembali ke atas"
            className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-white/90 text-brand-muted shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-brand-emerald hover:text-white hover:shadow-lg"
        >
            <ChevronUp className="h-5 w-5" />
        </button>
    );
}
