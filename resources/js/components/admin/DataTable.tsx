 
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
    className?: string;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    pagination?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    emptyMessage?: string;
}

export function DataTable({
    columns,
    data,
    pagination,
    emptyMessage = 'Tidak ada data.',
}: DataTableProps) {
    if (data.length === 0) {
        return (
            <div className="rounded-lg border bg-card p-8 text-center">
                <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border bg-card">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-4 py-3 text-left font-medium text-muted-foreground ${col.className || ''}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b last:border-0 hover:bg-muted/30"
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className={`px-4 py-3 ${col.className || ''}`}>
                                        {col.render
                                            ? col.render(item)
                                            : String(item[col.key] ?? '-')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && pagination.last_page > 1 && (
                <div className="flex items-center justify-between border-t px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan {(pagination.current_page - 1) * pagination.per_page + 1} -{' '}
                        {Math.min(pagination.current_page * pagination.per_page, pagination.total)} dari{' '}
                        {pagination.total} data
                    </p>
                    <div className="flex gap-1">
                        {pagination.current_page > 1 && (
                            <button
                                onClick={() => {
                                    const url = new URL(window.location.href);
                                    url.searchParams.set('page', String(pagination.current_page - 1));
                                    router.visit(url.toString());
                                }}
                                className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                        )}
                        {pagination.current_page < pagination.last_page && (
                            <button
                                onClick={() => {
                                    const url = new URL(window.location.href);
                                    url.searchParams.set('page', String(pagination.current_page + 1));
                                    router.visit(url.toString());
                                }}
                                className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
