import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
    value?: string;
    onChange?: (value: string) => void;
    onSearch: (value: string) => void;
    placeholder?: string;
}

export function SearchInput({
    value: initialValue = '',
    onChange,
    onSearch,
    placeholder = 'Cari...',
}: SearchInputProps) {
    const [value, setValue] = useState(initialValue);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;

            return;
        }

        const timer = setTimeout(() => {
            onSearch(value);
        }, 300);

        return () => clearTimeout(timer);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
    };

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
        </div>
    );
}
