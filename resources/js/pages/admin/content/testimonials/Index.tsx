import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { DataTable } from '@/components/admin/DataTable';
import { EmptyState } from '@/components/admin/EmptyState';
import { FilterSelect } from '@/components/admin/FilterSelect';
import { SearchInput } from '@/components/admin/SearchInput';
import { StarRating } from '@/components/admin/StarRating';
import { StatusBadge } from '@/components/admin/StatusBadge';

interface Testimonial {
    id: number;
    name: string;
    city: string;
    package: string;
    content: string;
    rating: number;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
}

interface PaginatedData {
    data: Testimonial[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface TestimonialsIndexProps {
    testimonials: PaginatedData;
}

export default function Index({ testimonials }: TestimonialsIndexProps) {
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
        router.visit(`/admin/content/testimonials?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
params.set(key, value);
} else {
params.delete(key);
}

        params.delete('page');
        router.visit(`/admin/content/testimonials?${params.toString()}`);
    }

    function handleDelete() {
        if (!deleteId) {
return;
}

        router.delete(`/admin/content/testimonials/${deleteId}`);
        setDeleteId(null);
    }

    const columns = [
        {
            key: 'name',
            label: 'Testimoni',
            render: (item: Testimonial) => (
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.city}</p>
                </div>
            ),
        },
        {
            key: 'rating',
            label: 'Rating',
            className: 'w-32',
            render: (item: Testimonial) => <StarRating value={item.rating} readonly size="sm" />,
        },
        {
            key: 'is_featured',
            label: 'Fitur',
            className: 'w-24',
            render: (item: Testimonial) => item.is_featured ? (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">Unggulan</span>
            ) : null,
        },
        {
            key: 'is_active',
            label: 'Status',
            className: 'w-24',
            render: (item: Testimonial) => <StatusBadge active={item.is_active} />,
        },
        {
            key: 'actions',
            label: '',
            className: 'w-32',
            render: (item: Testimonial) => (
                <div className="flex gap-1">
                    <Link href={`/admin/content/testimonials/${item.id}/edit`} className="rounded px-2 py-1 text-sm text-primary hover:bg-primary/10">Edit</Link>
                    <button onClick={() => setDeleteId(item.id)} className="rounded px-2 py-1 text-sm text-destructive hover:bg-destructive/10">Hapus</button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Testimoni" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Testimoni" description="Kelola testimoni pelanggan" action={{ label: 'Tambah Testimoni', href: '/admin/content/testimonials/create' }} />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput value={urlParams.get('q') || ''} onSearch={handleSearch} placeholder="Cari testimoni..." />
                    </div>
                    <FilterSelect value={urlParams.get('status') || ''} onChange={(v) => handleFilter('status', v)} options={[{ value: '1', label: 'Aktif' }, { value: '0', label: 'Nonaktif' }]} placeholder="Semua Status" />
                    <FilterSelect value={urlParams.get('featured') || ''} onChange={(v) => handleFilter('featured', v)} options={[{ value: '1', label: 'Unggulan' }, { value: '0', label: 'Biasa' }]} placeholder="Semua Fitur" />
                </div>

                {testimonials.data.length === 0 ? (
                    <EmptyState title="Belum ada testimoni" description="Tambahkan testimoni pelanggan" action={{ label: 'Tambah Testimoni', href: '/admin/content/testimonials/create' }} />
                ) : (
                    <DataTable columns={columns} data={testimonials.data as unknown as Record<string, unknown>[]} pagination={testimonials} />
                )}
            </div>

            <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Hapus Testimoni" description="Apakah Anda yakin ingin menghapus testimoni ini?" onConfirm={handleDelete} />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Testimoni', href: '/admin/content/testimonials' },
    ],
};
