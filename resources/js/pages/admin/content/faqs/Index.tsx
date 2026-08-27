import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { DataTable } from '@/components/admin/DataTable';
import { EmptyState } from '@/components/admin/EmptyState';
import { FilterSelect } from '@/components/admin/FilterSelect';
import { SearchInput } from '@/components/admin/SearchInput';
import { StatusBadge } from '@/components/admin/StatusBadge';

interface Faq {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
}

interface PaginatedData {
    data: Faq[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface FaqsIndexProps {
    faqs: PaginatedData;
}

export default function Index({ faqs }: FaqsIndexProps) {
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
        router.visit(`/admin/content/faqs?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
params.set(key, value);
} else {
params.delete(key);
}

        params.delete('page');
        router.visit(`/admin/content/faqs?${params.toString()}`);
    }

    function handleDelete() {
        if (!deleteId) {
return;
}

        router.delete(`/admin/content/faqs/${deleteId}`);
        setDeleteId(null);
    }

    const columns = [
        {
            key: 'question',
            label: 'Pertanyaan',
            render: (item: Faq) => (
                <div>
                    <p className="font-medium">{item.question}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.answer}</p>
                </div>
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
            render: (item: Faq) => <StatusBadge active={item.is_active} />,
        },
        {
            key: 'actions',
            label: '',
            className: 'w-32',
            render: (item: Faq) => (
                <div className="flex gap-1">
                    <Link href={`/admin/content/faqs/${item.id}/edit`} className="rounded px-2 py-1 text-sm text-primary hover:bg-primary/10">Edit</Link>
                    <button onClick={() => setDeleteId(item.id)} className="rounded px-2 py-1 text-sm text-destructive hover:bg-destructive/10">Hapus</button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="FAQ" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="FAQ" description="Kelola pertanyaan yang sering diajukan" action={{ label: 'Tambah FAQ', href: '/admin/content/faqs/create' }} />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput value={urlParams.get('q') || ''} onSearch={handleSearch} placeholder="Cari FAQ..." />
                    </div>
                    <FilterSelect value={urlParams.get('status') || ''} onChange={(v) => handleFilter('status', v)} options={[{ value: '1', label: 'Aktif' }, { value: '0', label: 'Nonaktif' }]} placeholder="Semua Status" />
                </div>

                {faqs.data.length === 0 ? (
                    <EmptyState title="Belum ada FAQ" description="Tambahkan pertanyaan yang sering diajukan" action={{ label: 'Tambah FAQ', href: '/admin/content/faqs/create' }} />
                ) : (
                    <DataTable columns={columns} data={faqs.data as unknown as Record<string, unknown>[]} pagination={faqs} />
                )}
            </div>

            <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Hapus FAQ" description="Apakah Anda yakin ingin menghapus FAQ ini?" onConfirm={handleDelete} />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'FAQ', href: '/admin/content/faqs' },
    ],
};
