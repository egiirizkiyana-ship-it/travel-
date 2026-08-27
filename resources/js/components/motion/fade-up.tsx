'use client';

import type { ReactNode } from 'react';

interface FadeUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    distance?: number;
}

export function FadeUp({
    children,
    delay = 0,
    duration = 0.6,
    className,
    distance = 30,
}: FadeUpProps) {
    return (
        <>
            <style>{`
                @keyframes fadeUpAnim {
                    from { opacity: 0; transform: translateY(${distance}px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .fade-up-animate { animation: none !important; opacity: 1 !important; transform: none !important; }
                }
            `}</style>
            <div
                className={`fade-up-animate ${className || ''}`}
                style={{
                    opacity: 0,
                    transform: `translateY(${distance}px)`,
                    animation: `fadeUpAnim ${duration}s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s forwards`,
                }}
            >
                {children}
            </div>
        </>
    );
}
