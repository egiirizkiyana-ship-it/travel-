import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { EmptyState } from '@/components/admin/EmptyState';
import { FilterSelect } from '@/components/admin/FilterSelect';
import { ImagePreview } from '@/components/admin/ImagePreview';
import { SearchInput } from '@/components/admin/SearchInput';
import { StatusBadge } from '@/components/admin/StatusBadge';

interface GalleryItem {
    id: number;
    title: string;
    image: string;
    category: string;
    is_active: boolean;
    sort_order: number;
}

interface PaginatedData {
    data: GalleryItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface GalleryIndexProps {
    gallery: PaginatedData;
}

const categories = [
    { value: 'makkah', label: 'Makkah' },
    { value: 'madinah', label: 'Madinah' },
    { value: 'jamaah', label: 'Jamaah' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'transportation', label: 'Transportasi' },
    { value: 'other', label: 'Lainnya' },
];

export default function Index({ gallery }: GalleryIndexProps) {
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
        router.visit(`/admin/content/gallery?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
params.set(key, value);
} else {
params.delete(key);
}

        params.delete('page');
        router.visit(`/admin/content/gallery?${params.toString()}`);
    }

    function handleDelete() {
        if (!deleteId) {
return;
}

        router.delete(`/admin/content/gallery/${deleteId}`);
        setDeleteId(null);
    }

    return (
        <>
            <Head title="Galeri" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Galeri" description="Kelola galeri foto" action={{ label: 'Tambah Foto', href: '/admin/content/gallery/create' }} />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput value={urlParams.get('q') || ''} onSearch={handleSearch} placeholder="Cari galeri..." />
                    </div>
                    <FilterSelect value={urlParams.get('category') || ''} onChange={(v) => handleFilter('category', v)} options={categories} placeholder="Semua Kategori" />
                    <FilterSelect value={urlParams.get('status') || ''} onChange={(v) => handleFilter('status', v)} options={[{ value: '1', label: 'Aktif' }, { value: '0', label: 'Nonaktif' }]} placeholder="Semua Status" />
                </div>

                {gallery.data.length === 0 ? (
                    <EmptyState title="Belum ada foto" description="Tambahkan foto ke galeri" action={{ label: 'Tambah Foto', href: '/admin/content/gallery/create' }} />
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {gallery.data.map((item) => (
                            <div key={item.id} className="group relative overflow-hidden rounded-lg border bg-card">
                                <div className="aspect-square">
                                    <ImagePreview src={item.image} alt={item.title} className="h-full w-full" />
                                </div>
                                <div className="p-3">
                                    <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground capitalize">{item.category}</span>
                                        <StatusBadge active={item.is_active} />
                                    </div>
                                    <div className="mt-2 flex gap-1">
                                        <Link href={`/admin/content/gallery/${item.id}/edit`} className="rounded px-2 py-1 text-xs text-primary hover:bg-primary/10">Edit</Link>
                                        <button onClick={() => setDeleteId(item.id)} className="rounded px-2 py-1 text-xs text-destructive hover:bg-destructive/10">Hapus</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {gallery.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: gallery.last_page }, (_, i) => i + 1).map((page) => (
                            <button key={page} onClick={() => {
 const params = new URLSearchParams(window.location.search); params.set('page', String(page)); router.visit(`/admin/content/gallery?${params.toString()}`); 
}} className={`h-8 w-8 rounded text-sm ${page === gallery.current_page ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'}`}>
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Hapus Foto" description="Apakah Anda yakin ingin menghapus foto ini?" onConfirm={handleDelete} />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Galeri', href: '/admin/content/gallery' },
    ],
};
