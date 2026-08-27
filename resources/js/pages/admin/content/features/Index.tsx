import { Head, Link, router } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { EmptyState } from '@/components/admin/EmptyState';
import { StatusBadge } from '@/components/admin/StatusBadge';

interface Feature {
    id: number;
    title: string;
    description: string;
    icon: string;
    sort_order: number;
    is_active: boolean;
}

interface FeaturesIndexProps {
    features: Feature[];
}

export default function Index({ features }: FeaturesIndexProps) {
    const handleDelete = (id: number) => {
        router.delete(`/admin/content/features/${id}`);
    };

    const columns = [
        {
            key: 'title',
            label: 'Judul',
            render: (item: Feature) => (
                <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                </div>
            ),
        },
        { key: 'icon', label: 'Icon' },
        {
            key: 'sort_order',
            label: 'Urutan',
            className: 'w-20',
        },
        {
            key: 'is_active',
            label: 'Status',
            className: 'w-24',
            render: (item: Feature) => <StatusBadge active={item.is_active} />,
        },
        {
            key: 'actions',
            label: '',
            className: 'w-32',
            render: (item: Feature) => (
                <div className="flex gap-1">
                    <Link
                        href={`/admin/content/features/${item.id}/edit`}
                        className="rounded px-2 py-1 text-sm text-primary hover:bg-primary/10"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => {
                            handleDelete(item.id);
                        }}
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
            <Head title="Keunggulan" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader
                    title="Keunggulan"
                    description="Kelola keunggulan perusahaan"
                    action={{
                        label: 'Tambah Keunggulan',
                        href: '/admin/content/features/create',
                    }}
                />

                {features.length === 0 ? (
                    <EmptyState
                        title="Belum ada keunggulan"
                        description="Tambahkan keunggulan perusahaan Anda"
                        action={{
                            label: 'Tambah Keunggulan',
                            href: '/admin/content/features/create',
                        }}
                    />
                ) : (
                    <DataTable columns={columns} data={features as unknown as Record<string, unknown>[]} />
                )}
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Keunggulan', href: '/admin/content/features' },
    ],
};
