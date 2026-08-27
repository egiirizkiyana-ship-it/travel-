import { Star } from 'lucide-react';

interface StarRatingProps {
    value: number;
    onChange?: (value: number) => void;
    readonly?: boolean;
    size?: 'sm' | 'md';
}

export function StarRating({ value, onChange, readonly = false, size = 'md' }: StarRatingProps) {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange?.(star)}
                    disabled={readonly}
                    className={`${readonly ? 'cursor-default' : 'cursor-pointer'} disabled:cursor-default`}
                >
                    <Star
                        className={`${sizeClass} ${
                            star <= value
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                        } ${!readonly ? 'hover:text-yellow-400' : ''}`}
                    />
                </button>
            ))}
        </div>
    );
}
