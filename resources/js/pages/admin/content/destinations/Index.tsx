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

interface Destination {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
}

interface PaginatedData {
    data: Destination[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface DestinationsIndexProps {
    destinations: PaginatedData;
}

export default function Index({ destinations }: DestinationsIndexProps) {
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
        router.visit(`/admin/content/destinations?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
params.set(key, value);
} else {
params.delete(key);
}

        params.delete('page');
        router.visit(`/admin/content/destinations?${params.toString()}`);
    }

    function handleDelete() {
        if (!deleteId) {
return;
}

        router.delete(`/admin/content/destinations/${deleteId}`);
        setDeleteId(null);
    }

    const columns = [
        {
            key: 'image',
            label: '',
            className: 'w-16',
            render: (item: Destination) => (
                <ImagePreview src={item.image} alt={item.name} className="h-10 w-10 rounded" />
            ),
        },
        {
            key: 'name',
            label: 'Destinasi',
            render: (item: Destination) => (
                <div>
                    <p className="font-medium">{item.name}</p>
                    {item.is_featured && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                            Unggulan
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: 'is_active',
            label: 'Status',
            className: 'w-24',
            render: (item: Destination) => <StatusBadge active={item.is_active} />,
        },
        {
            key: 'actions',
            label: '',
            className: 'w-32',
            render: (item: Destination) => (
                <div className="flex gap-1">
                    <Link
                        href={`/admin/content/destinations/${item.id}/edit`}
                        className="rounded px-2 py-1 text-sm text-primary hover:bg-primary/10"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => setDeleteId(item.id)}
                        className="rounded px-2 py-1 text-sm text-destructive hover:bg-destructive/10"
                    >
                        Hapus
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Destinasi" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader
                    title="Destinasi"
                    description="Kelola destinasi perjalanan"
                    action={{ label: 'Tambah Destinasi', href: '/admin/content/destinations/create' }}
                />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput value={urlParams.get('q') || ''} onSearch={handleSearch} placeholder="Cari destinasi..." />
                    </div>
                    <FilterSelect
                        value={urlParams.get('status') || ''}
                        onChange={(v) => handleFilter('status', v)}
                        options={[{ value: '1', label: 'Aktif' }, { value: '0', label: 'Nonaktif' }]}
                        placeholder="Semua Status"
                    />
                </div>

                {destinations.data.length === 0 ? (
                    <EmptyState title="Belum ada destinasi" description="Tambahkan destinasi perjalanan" action={{ label: 'Tambah Destinasi', href: '/admin/content/destinations/create' }} />
                ) : (
                    <DataTable columns={columns} data={destinations.data as unknown as Record<string, unknown>[]} pagination={destinations} />
                )}
            </div>

            <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Hapus Destinasi" description="Apakah Anda yakin ingin menghapus destinasi ini?" onConfirm={handleDelete} />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Destinasi', href: '/admin/content/destinations' },
    ],
};
