import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface AdminPageHeaderProps {
    title: string;
    description?: string;
    action?: {
        label: string;
        href: string;
    };
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
            {action && (
                <Link
                    href={action.href}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    {action.label}
                </Link>
            )}
        </div>
    );
}
