interface FilterSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export function FilterSelect({
    value,
    onChange,
    options,
    placeholder = 'Semua',
}: FilterSelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
