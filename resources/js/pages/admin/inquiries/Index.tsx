import { Head, Link, router } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { EmptyState } from '@/components/admin/EmptyState';
import { FilterSelect } from '@/components/admin/FilterSelect';
import { SearchInput } from '@/components/admin/SearchInput';
import { InquiryStatusBadge } from '@/components/admin/StatusBadge';

interface Inquiry {
    id: number;
    name: string;
    phone: string;
    email: string;
    message: string;
    status: string;
    created_at: string;
    package: { name: string } | null;
}

interface PaginatedData {
    data: Inquiry[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface InquiriesIndexProps {
    inquiries: PaginatedData;
}

export default function Index({ inquiries }: InquiriesIndexProps) {
    const urlParams = new URLSearchParams(window.location.search);

    function handleSearch(q: string) {
        const params = new URLSearchParams(window.location.search);

        if (q) {
params.set('q', q);
} else {
params.delete('q');
}

        params.delete('page');
        router.visit(`/admin/inquiries?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
params.set(key, value);
} else {
params.delete(key);
}

        params.delete('page');
        router.visit(`/admin/inquiries?${params.toString()}`);
    }

    const columns = [
        {
            key: 'name',
            label: 'Nama',
            render: (item: Inquiry) => (
                <div>
                    <Link href={`/admin/inquiries/${item.id}`} className="font-medium text-primary hover:underline">{item.name}</Link>
                    <p className="text-xs text-muted-foreground">{item.phone}</p>
                </div>
            ),
        },
        {
            key: 'package',
            label: 'Paket',
            render: (item: Inquiry) => item.package?.name || '-',
        },
        {
            key: 'status',
            label: 'Status',
            className: 'w-28',
            render: (item: Inquiry) => <InquiryStatusBadge status={item.status} />,
        },
        {
            key: 'created_at',
            label: 'Tanggal',
            className: 'w-32',
            render: (item: Inquiry) => new Date(item.created_at).toLocaleDateString('id-ID'),
        },
    ];

    return (
        <>
            <Head title="Pertanyaan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Pertanyaan" description="Kelola pertanyaan dari pelanggan" />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput value={urlParams.get('q') || ''} onSearch={handleSearch} placeholder="Cari pertanyaan..." />
                    </div>
                    <FilterSelect
                        value={urlParams.get('status') || ''}
                        onChange={(v) => handleFilter('status', v)}
                        options={[
                            { value: 'new', label: 'Baru' },
                            { value: 'contacted', label: 'Dihubungi' },
                            { value: 'follow_up', label: 'Follow Up' },
                            { value: 'converted', label: 'Konversi' },
                            { value: 'closed', label: 'Selesai' },
                        ]}
                        placeholder="Semua Status"
                    />
                </div>

                {inquiries.data.length === 0 ? (
                    <EmptyState title="Belum ada pertanyaan" description="Pertanyaan dari pelanggan akan muncul di sini" />
                ) : (
                    <DataTable columns={columns} data={inquiries.data as unknown as Record<string, unknown>[]} pagination={inquiries} />
                )}
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Pertanyaan', href: '/admin/inquiries' },
    ],
};
