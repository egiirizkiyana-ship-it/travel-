import { Link } from '@inertiajs/react';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        href: string;
    };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                {icon || <FileX className="h-8 w-8 text-muted-foreground" />}
            </div>
            <h3 className="mt-4 text-lg font-medium text-foreground">{title}</h3>
            {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
            {action && (
                <Link
                    href={action.href}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    {action.label}
                </Link>
            )}
        </div>
    );
}
