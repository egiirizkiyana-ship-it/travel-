'use client';

import type { ReactNode } from 'react';

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
    return <div className={className}>{children}</div>;
}
