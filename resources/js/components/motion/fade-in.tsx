'use client';

import type { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
}

const directionMap = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
};

export function FadeIn({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className,
}: FadeInProps) {
    const { x, y } = directionMap[direction];

    return (
        <>
            <style>{`
                @keyframes fadeInAnim {
                    from { opacity: 0; transform: translate(${x}px, ${y}px); }
                    to { opacity: 1; transform: translate(0, 0); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .fade-in-animate { animation: none !important; opacity: 1 !important; transform: none !important; }
                }
            `}</style>
            <div
                className={`fade-in-animate ${className || ''}`}
                style={{
                    opacity: 0,
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `fadeInAnim ${duration}s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s forwards`,
                }}
            >
                {children}
            </div>
        </>
    );
}
