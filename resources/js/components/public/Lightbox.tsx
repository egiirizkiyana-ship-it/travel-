'use client';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useCallback } from 'react';

interface LightboxImage {
    id: number;
    image: string;
    title?: string;
    subtitle?: string;
}

interface LightboxProps {
    images: LightboxImage[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

export function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }

            if (e.key === 'ArrowLeft') {
                onPrev();
            }

            if (e.key === 'ArrowRight') {
                onNext();
            }
        },
        [onClose, onPrev, onNext],
    );

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const current = images[currentIndex];

    if (!current) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={current.title || 'Gambar galeri'}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Tutup"
            >
                <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrev();
                        }}
                        className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                        aria-label="Sebelumnya"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                        className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                        aria-label="Selanjutnya"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </>
            )}

            <div
                className="flex max-h-[85vh] max-w-[90vw] flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={current.image}
                    alt={current.title || `Gambar ${currentIndex + 1}`}
                    className="max-h-[78vh] max-w-[90vw] object-contain rounded-lg"
                />
                {(current.title || current.subtitle) && (
                    <div className="mt-3 text-center">
                        {current.subtitle && (
                            <p className="text-xs font-medium uppercase tracking-wider text-brand-gold">
                                {current.subtitle}
                            </p>
                        )}
                        {current.title && (
                            <p className="mt-1 text-sm font-medium text-white/90">
                                {current.title}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-sm text-white/70">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}
