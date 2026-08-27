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

interface TeamMember {
    id: number;
    name: string;
    position: string;
    bio: string;
    photo: string;
    sort_order: number;
    is_active: boolean;
}

interface PaginatedData {
    data: TeamMember[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface TeamMembersIndexProps {
    members: PaginatedData;
}

export default function Index({ members }: TeamMembersIndexProps) {
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
        router.visit(`/admin/content/team-members?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.delete('page');
        router.visit(`/admin/content/team-members?${params.toString()}`);
    }

    function handleDelete() {
        if (!deleteId) {
            return;
        }

        router.delete(`/admin/content/team-members/${deleteId}`);
        setDeleteId(null);
    }

    const columns = [
        {
            key: 'photo',
            label: 'Foto',
            className: 'w-20',
            render: (item: TeamMember) => (
                <div className="h-12 w-12 overflow-hidden rounded">
                    <ImagePreview src={item.photo} alt={item.name} className="h-full w-full" />
                </div>
            ),
        },
        {
            key: 'name',
            label: 'Nama',
            render: (item: TeamMember) => (
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.position}</p>
                </div>
            ),
        },
        {
            key: 'position',
            label: 'Posisi',
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
            render: (item: TeamMember) => <StatusBadge active={item.is_active} />,
        },
        {
            key: 'actions',
            label: '',
            className: 'w-32',
            render: (item: TeamMember) => (
                <div className="flex gap-1">
                    <Link
                        href={`/admin/content/team-members/${item.id}/edit`}
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
            <Head title="Tim" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader
                    title="Tim"
                    description="Kelola anggota tim"
                    action={{ label: 'Tambah Anggota', href: '/admin/content/team-members/create' }}
                />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput value={urlParams.get('q') || ''} onSearch={handleSearch} placeholder="Cari tim..." />
                    </div>
                    <FilterSelect
                        value={urlParams.get('status') || ''}
                        onChange={(v) => handleFilter('status', v)}
                        options={[{ value: '1', label: 'Aktif' }, { value: '0', label: 'Nonaktif' }]}
                        placeholder="Semua Status"
                    />
                </div>

                {members.data.length === 0 ? (
                    <EmptyState
                        title="Belum ada anggota tim"
                        description="Tambahkan anggota tim baru"
                        action={{ label: 'Tambah Anggota', href: '/admin/content/team-members/create' }}
                    />
                ) : (
                    <DataTable
                        columns={columns}
                        data={members.data as unknown as Record<string, unknown>[]}
                        pagination={members}
                    />
                )}
            </div>

            <ConfirmDialog
                open={deleteId !== null}
                onOpenChange={() => setDeleteId(null)}
                title="Hapus Anggota"
                description="Apakah Anda yakin ingin menghapus anggota tim ini?"
                onConfirm={handleDelete}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Tim', href: '/admin/content/team-members' },
    ],
};
