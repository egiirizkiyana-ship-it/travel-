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

interface Package {
    id: number;
    name: string;
    slug: string;
    duration: string;
    price: number;
    image: string;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
}

interface PaginatedData {
    data: Package[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface PackagesIndexProps {
    packages: PaginatedData;
}

export default function Index({ packages }: PackagesIndexProps) {
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
        router.visit(`/admin/content/packages?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.delete('page');
        router.visit(`/admin/content/packages?${params.toString()}`);
    }

    function handleDelete() {
        if (!deleteId) {
return;
}

        router.delete(`/admin/content/packages/${deleteId}`);
        setDeleteId(null);
    }

    const columns = [
        {
            key: 'image',
            label: '',
            className: 'w-16',
            render: (item: Package) => (
                <ImagePreview src={item.image} alt={item.name} className="h-10 w-10 rounded" />
            ),
        },
        {
            key: 'name',
            label: 'Paket',
            render: (item: Package) => (
                <div>
                    <p className="font-medium">{item.name}</p>
                    {item.is_featured && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                            Populer
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: 'duration',
            label: 'Durasi',
            className: 'w-32',
        },
        {
            key: 'price',
            label: 'Harga',
            className: 'w-40',
            render: (item: Package) => (
                <span className="font-medium text-primary">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                </span>
            ),
        },
        {
            key: 'is_active',
            label: 'Status',
            className: 'w-24',
            render: (item: Package) => <StatusBadge active={item.is_active} />,
        },
        {
            key: 'actions',
            label: '',
            className: 'w-32',
            render: (item: Package) => (
                <div className="flex gap-1">
                    <Link
                        href={`/admin/content/packages/${item.id}/edit`}
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
            <Head title="Paket Umroh" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader
                    title="Paket Umroh"
                    description="Kelola paket umroh yang ditawarkan"
                    action={{
                        label: 'Tambah Paket',
                        href: '/admin/content/packages/create',
                    }}
                />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput
                            value={urlParams.get('q') || ''}
                            onSearch={handleSearch}
                            placeholder="Cari paket..."
                        />
                    </div>
                    <FilterSelect
                        value={urlParams.get('status') || ''}
                        onChange={(v) => handleFilter('status', v)}
                        options={[
                            { value: '1', label: 'Aktif' },
                            { value: '0', label: 'Nonaktif' },
                        ]}
                        placeholder="Semua Status"
                    />
                    <FilterSelect
                        value={urlParams.get('featured') || ''}
                        onChange={(v) => handleFilter('featured', v)}
                        options={[
                            { value: '1', label: 'Populer' },
                            { value: '0', label: 'Biasa' },
                        ]}
                        placeholder="Semua Fitur"
                    />
                </div>

                {packages.data.length === 0 ? (
                    <EmptyState
                        title="Belum ada paket Umroh"
                        description="Tambahkan paket umroh yang ditawarkan"
                        action={{
                            label: 'Tambah Paket',
                            href: '/admin/content/packages/create',
                        }}
                    />
                ) : (
                    <DataTable
                        columns={columns}
                        data={packages.data as unknown as Record<string, unknown>[]}
                        pagination={packages}
                    />
                )}
            </div>

            <ConfirmDialog
                open={deleteId !== null}
                onOpenChange={() => setDeleteId(null)}
                title="Hapus Paket"
                description="Apakah Anda yakin ingin menghapus paket ini? Tindakan ini tidak dapat dibatalkan."
                onConfirm={handleDelete}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Paket Umroh', href: '/admin/content/packages' },
    ],
};
