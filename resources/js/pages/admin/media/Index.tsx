import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Upload, Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { EmptyState } from '@/components/admin/EmptyState';
import { FilterSelect } from '@/components/admin/FilterSelect';
import { ImagePreview } from '@/components/admin/ImagePreview';
import { SearchInput } from '@/components/admin/SearchInput';

interface MediaItem {
    id: number;
    filename: string;
    original_name: string;
    path: string;
    mime_type: string;
    size: number;
    alt_text: string;
    created_at: string;
}

interface PaginatedData {
    data: MediaItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface MediaIndexProps {
    media: PaginatedData;
}

export default function Index({ media }: MediaIndexProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const { flash } = usePage().props;
    const urlParams = new URLSearchParams(window.location.search);
    const { data, setData, post, processing } = useForm({
        file: null as File | null,
        alt_text: '',
    });

    function handleSearch(q: string) {
        const params = new URLSearchParams(window.location.search);

        if (q) {
params.set('q', q);
} else {
params.delete('q');
}

        params.delete('page');
        router.visit(`/admin/media?${params.toString()}`);
    }

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value) {
params.set(key, value);
} else {
params.delete(key);
}

        params.delete('page');
        router.visit(`/admin/media?${params.toString()}`);
    }

    function handleUpload(e: React.FormEvent) {
        e.preventDefault();

        if (!data.file) {
return;
}

        post('/admin/media', {
            onSuccess: () => {
                setData('file', null);
                setData('alt_text', '');
            },
        });
    }

    function handleDelete() {
        if (!deleteId) {
            return;
        }

        setDeleting(true);
        router.delete(`/admin/media/${deleteId}`, {
            onStart: () => setDeleting(true),
            onFinish: () => {
                setDeleting(false);
                setDeleteId(null);
            },
        });
    }

    function copyPath(path: string) {
        navigator.clipboard.writeText(`/storage/${path}`);
        setCopied(path);
        setTimeout(() => setCopied(null), 2000);
    }

    function formatSize(bytes: number) {
        if (bytes < 1024) {
return bytes + ' B';
}

        if (bytes < 1024 * 1024) {
return (bytes / 1024).toFixed(1) + ' KB';
}

        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    return (
        <>
            <Head title="Media Library" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Media Library" description="Kelola file media" />

                {flash?.success && (
                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">{flash.success}</div>
                )}
                {flash?.error && (
                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{flash.error}</div>
                )}

                <div className="rounded-lg border bg-card p-6">
                    <form onSubmit={handleUpload} className="flex flex-wrap items-end gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium">Upload File</label>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="w-48">
                            <label className="text-sm font-medium">Alt Text</label>
                            <input
                                type="text"
                                value={data.alt_text}
                                onChange={(e) => setData('alt_text', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!data.file || processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        >
                            <Upload className="h-4 w-4" />
                            {processing ? 'Mengupload...' : 'Upload'}
                        </button>
                    </form>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="w-64">
                        <SearchInput value={urlParams.get('q') || ''} onSearch={handleSearch} placeholder="Cari media..." />
                    </div>
                    <FilterSelect
                        value={urlParams.get('type') || ''}
                        onChange={(v) => handleFilter('type', v)}
                        options={[
                            { value: 'image', label: 'Gambar' },
                        ]}
                        placeholder="Semua Tipe"
                    />
                </div>

                {media.data.length === 0 ? (
                    <EmptyState title="Belum ada file media" description="Upload file gambar untuk mulai" />
                ) : (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {media.data.map((item) => (
                                <div key={item.id} className="group overflow-hidden rounded-lg border bg-card">
                                    <div className="aspect-square bg-muted">
                                        <ImagePreview
                                            src={`/storage/${item.filename}`}
                                            alt={item.alt_text || item.original_name}
                                            className="h-full w-full"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs font-medium line-clamp-1">{item.original_name}</p>
                                        <p className="text-xs text-muted-foreground">{formatSize(item.size)}</p>
                                        <div className="mt-2 flex gap-1">
                                            <button
                                                onClick={() => copyPath(item.filename)}
                                                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-primary hover:bg-primary/10"
                                            >
                                                <Copy className="h-3 w-3" />
                                                {copied === item.filename ? 'Tersalin!' : 'Salin'}
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(item.id)}
                                                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {media.last_page > 1 && (
                            <div className="flex justify-center gap-2">
                                {Array.from({ length: media.last_page }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => {
                                            const params = new URLSearchParams(window.location.search);
                                            params.set('page', String(page));
                                            router.visit(`/admin/media?${params.toString()}`);
                                        }}
                                        className={`h-8 w-8 rounded text-sm ${page === media.current_page ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            <ConfirmDialog
                open={deleteId !== null}
                onOpenChange={() => setDeleteId(null)}
                title="Hapus Media"
                description="Apakah Anda yakin ingin menghapus file ini?"
                onConfirm={handleDelete}
                loading={deleting}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Media Library', href: '/admin/media' },
    ],
};
