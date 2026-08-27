'use client';

import { MapPin } from 'lucide-react';
import { useState } from 'react';
import type { GalleryItem } from '@/types';

interface GalleryCardProps {
    item: GalleryItem;
    onClick?: () => void;
}

const categoryLabels: Record<string, string> = {
    makkah: 'Makkah',
    madinah: 'Madinah',
    jamaah: 'Jamaah',
    hotel: 'Hotel',
    transportation: 'Transportasi',
    other: 'Lainnya',
};

export function GalleryCard({ item, onClick }: GalleryCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl"
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {!imageError ? (
                <img
                    src={item.image}
                    alt={item.title}
                    loading="eager"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
                    <MapPin className="h-10 w-10 text-brand-muted/40" />
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/70" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-brand-gold">
                    {categoryLabels[item.category] || item.category}
                </p>
                <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                    {item.title}
                </h3>
            </div>
        </div>
    );
}
