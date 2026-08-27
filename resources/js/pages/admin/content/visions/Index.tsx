import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { DataTable } from '@/components/admin/DataTable';
import { EmptyState } from '@/components/admin/EmptyState';
import { FilterSelect } from '@/components/admin/FilterSelect';
import { StatusBadge } from '@/components/admin/StatusBadge';

interface Vision {
    id: number;
    type: string;
    description: string;
    sort_order: number;
    is_active: boolean;
}

interface PaginatedData {
    data: Vision[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface VisionsIndexProps {
    visions: PaginatedData;
}

const typeOptions = [
    { value: 'vision', label: 'Visi' },
    { value: 'mission', label: 'Misi' },
];

export default function Index({ visions }: VisionsIndexProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const urlParams = new URLSearchParams(window.location.search);

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.delete('page');
        router.visit(`/admin/content/visions?${params.toString()}`);
    }

    function handleDelete() {
        if (!deleteId) {
            return;
        }

        router.delete(`/admin/content/visions/${deleteId}`);
        setDeleteId(null);
    }

    const columns = [
        {
            key: 'description',
            label: 'Deskripsi',
            render: (item: Vision) => (
                <div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
            ),
        },
        {
            key: 'type',
            label: 'Tipe',
            className: 'w-28',
            render: (item: Vision) => (
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium capitalize">
                    {item.type === 'vision' ? 'Visi' : 'Misi'}
                </span>
            ),
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
            render: (item: Vision) => <StatusBadge active={item.is_active} />,
        },
        {
            key: 'actions',
            label: '',
            className: 'w-32',
            render: (item: Vision) => (
                <div className="flex gap-1">
                    <Link href={`/admin/content/visions/${item.id}/edit`} className="rounded px-2 py-1 text-sm text-primary hover:bg-primary/10">Edit</Link>
                    <button onClick={() => setDeleteId(item.id)} className="rounded px-2 py-1 text-sm text-destructive hover:bg-destructive/10">Hapus</button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Visi & Misi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Visi & Misi" description="Kelola visi dan misi perusahaan" action={{ label: 'Tambah Visi & Misi', href: '/admin/content/visions/create' }} />

                <div className="flex flex-wrap items-center gap-3">
                    <FilterSelect value={urlParams.get('type') || ''} onChange={(v) => handleFilter('type', v)} options={typeOptions} placeholder="Semua Tipe" />
                    <FilterSelect value={urlParams.get('status') || ''} onChange={(v) => handleFilter('status', v)} options={[{ value: '1', label: 'Aktif' }, { value: '0', label: 'Nonaktif' }]} placeholder="Semua Status" />
                </div>

                {visions.data.length === 0 ? (
                    <EmptyState title="Belum ada visi & misi" description="Tambahkan visi dan misi perusahaan" action={{ label: 'Tambah Visi & Misi', href: '/admin/content/visions/create' }} />
                ) : (
                    <DataTable columns={columns} data={visions.data as unknown as Record<string, unknown>[]} pagination={visions} />
                )}
            </div>

            <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Hapus Visi & Misi" description="Apakah Anda yakin ingin menghapus item ini?" onConfirm={handleDelete} />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Visi & Misi', href: '/admin/content/visions' },
    ],
};
