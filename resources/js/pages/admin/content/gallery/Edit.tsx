import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface GalleryItem {
    id: number;
    title: string;
    image: string;
    category: string;
    alt_text: string;
    is_active: boolean;
    sort_order: number;
}

const categories = [
    { value: 'makkah', label: 'Makkah' },
    { value: 'madinah', label: 'Madinah' },
    { value: 'jamaah', label: 'Jamaah' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'transportation', label: 'Transportasi' },
    { value: 'other', label: 'Lainnya' },
];

interface GalleryEditProps {
    galleryItem: GalleryItem;
}

export default function Edit({ galleryItem }: GalleryEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: galleryItem.title || '',
        image: galleryItem.image || '',
        category: galleryItem.category || 'makkah',
        alt_text: galleryItem.alt_text || '',
        sort_order: galleryItem.sort_order || 0,
        is_active: galleryItem.is_active,
    });

    const [uploading, setUploading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/content/gallery/${galleryItem.id}`);
    }

    async function handleImageUpload(file: File) {
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const response = await fetch('/admin/content/gallery/image', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload gagal');
            }

            const result = await response.json();

            if (result.path) {
                setData('image', result.path);
            }
        } catch {
            alert('Gagal upload gambar. Silakan coba lagi.');
        } finally {
            setUploading(false);
        }
    }

    return (
        <>
            <Head title={`Edit: ${galleryItem.title}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title={`Edit: ${galleryItem.title}`} />
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="rounded-lg border bg-card p-6 space-y-4">
                                <h2 className="text-lg font-medium">Informasi Foto</h2>
                                <FormField label="Judul" error={errors.title} required>
                                    <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Kategori" error={errors.category} required>
                                    <select value={data.category} onChange={(e) => setData('category', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                                        {categories.map((cat) => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </FormField>
                                <FormField label="Alt Text" error={errors.alt_text}>
                                    <input type="text" value={data.alt_text} onChange={(e) => setData('alt_text', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Urutan" error={errors.sort_order}>
                                    <input type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded" />
                                    <label htmlFor="is_active" className="text-sm">Aktif</label>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-medium">Gambar</h2>
                            <ImageUploader
                                value={data.image}
                                onChange={(value) => setData('image', value)}
                                onFileSelect={handleImageUpload}
                            />
                            {uploading && (
                                <p className="mt-2 text-sm text-muted-foreground">Mengupload gambar...</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-6">
                        <FormActions processing={processing} onCancel={() => router.visit('/admin/content/gallery')} saveLabel="Simpan Perubahan" />
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Galeri', href: '/admin/content/gallery' },
        { title: 'Edit', href: '#' },
    ],
};
