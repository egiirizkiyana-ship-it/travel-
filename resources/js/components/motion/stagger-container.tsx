'use client';

import type { ReactNode } from 'react';

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
}

export function StaggerContainer({
    children,
    className,
}: StaggerContainerProps) {
    return <div className={className}>{children}</div>;
}
