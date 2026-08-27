interface FormFieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    description?: string;
}

export function FormField({ label, error, required, children, description }: FormFieldProps) {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
                {label}
                {required && <span className="ml-0.5 text-destructive">*</span>}
            </label>
            {children}
            {description && !error && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
