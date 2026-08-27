import { ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ImagePreviewProps {
    src?: string;
    alt?: string;
    className?: string;
}

export function ImagePreview({ src, alt = '', className = '' }: ImagePreviewProps) {
    const [error, setError] = useState(false);

    if (!src || error) {
        return (
            <div
                className={`flex items-center justify-center bg-muted ${className}`}
            >
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`object-cover ${className}`}
            onError={() => setError(true)}
        />
    );
}
