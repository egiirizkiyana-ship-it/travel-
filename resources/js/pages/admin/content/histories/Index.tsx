import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { DataTable } from '@/components/admin/DataTable';
import { EmptyState } from '@/components/admin/EmptyState';
import { FilterSelect } from '@/components/admin/FilterSelect';
import { ImagePreview } from '@/components/admin/ImagePreview';
import { SearchInput } from '@/components/admin/SearchInput';
import { StatusBadge } from '@/components/admin/StatusBadge';

interface History {
    id: number;
    year: string;
    title: string;
    description: string;
    image: string;
    sort_order: number;
    is_active: boolean;
}

interface PaginatedData {
    data: History[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface HistoriesIndexProps {
    histories: PaginatedData;
}

export default function Index({ histories }: HistoriesIndexProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const urlParams = new URLSearchParams(window.location.search);

    function handleSearch(q: string) {
        const params = new URLSearchParams(window.location.search);

        if (q) {
            params.set('q', q);
        } else {
            params.delete('q');
        }

        params.delete('page');
        router.visit(`/admin/content/histories?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.delete('page');
        router.visit(`/admin/content/histories?${params.toString()}`);
    }

    function handleDelete() {
        if (!deleteId) {
            return;
        }

        router.delete(`/admin/content/histories/${deleteId}`);
        setDeleteId(null);
    }

    const columns = [
        {
            key: 'title',
            label: 'Sejarah',
            render: (item: History) => (
                <div className="flex items-center gap-3">
                    {item.image && (
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded">
                            <ImagePreview src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        </div>
                    )}
                    <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'year',
            label: 'Tahun',
            className: 'w-24',
        },
        {
            key: 'sort_order',
            label: 'Urutan',
            className: 'w-20',
        },
        {
            key: 'is_active',
            label: 'Status',
            className: 'w-24',
            render: (item: History) => <StatusBadge active={item.is_active} />,
        },
        {
            key: 'actions',
            label: '',
            className: 'w-32',
            render: (item: History) => (
                <div className="flex gap-1">
                    <Link href={`/admin/content/histories/${item.id}/edit`} className="rounded px-2 py-1 text-sm text-primary hover:bg-primary/10">Edit</Link>
                    <button onClick={() => setDeleteId(item.id)} className="rounded px-2 py-1 text-sm text-destructive hover:bg-destructive/10">Hapus</button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Sejarah" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Sejarah" description="Kelola sejarah perusahaan" action={{ label: 'Tambah Sejarah', href: '/admin/content/histories/create' }} />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput value={urlParams.get('q') || ''} onSearch={handleSearch} placeholder="Cari sejarah..." />
                    </div>
                    <FilterSelect value={urlParams.get('status') || ''} onChange={(v) => handleFilter('status', v)} options={[{ value: '1', label: 'Aktif' }, { value: '0', label: 'Nonaktif' }]} placeholder="Semua Status" />
                </div>

                {histories.data.length === 0 ? (
                    <EmptyState title="Belum ada sejarah" description="Tambahkan sejarah perusahaan" action={{ label: 'Tambah Sejarah', href: '/admin/content/histories/create' }} />
                ) : (
                    <DataTable columns={columns} data={histories.data as unknown as Record<string, unknown>[]} pagination={histories} />
                )}
            </div>

            <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Hapus Sejarah" description="Apakah Anda yakin ingin menghapus sejarah ini?" onConfirm={handleDelete} />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Sejarah', href: '/admin/content/histories' },
    ],
};
