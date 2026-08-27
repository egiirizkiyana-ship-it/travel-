'use client';

import type { ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function Reveal({
    children,
    delay = 0,
    duration = 0.8,
    className,
}: RevealProps) {
    return (
        <>
            <style>{`
                @keyframes revealAnim {
                    from { clip-path: inset(0 0 100% 0); }
                    to { clip-path: inset(0 0 0% 0); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .reveal-animate { animation: none !important; clip-path: none !important; }
                }
            `}</style>
            <div
                className={`reveal-animate ${className || ''}`}
                style={{
                    clipPath: 'inset(0 0 100% 0)',
                    animation: `revealAnim ${duration}s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s forwards`,
                }}
            >
                {children}
            </div>
        </>
    );
}
