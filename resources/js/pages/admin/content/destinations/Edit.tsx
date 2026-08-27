import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface Destination {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
}

interface DestinationEditProps {
    destination: Destination;
}

export default function Edit({ destination }: DestinationEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: destination.name || '',
        slug: destination.slug || '',
        description: destination.description || '',
        image: destination.image || '',
        is_featured: destination.is_featured,
        is_active: destination.is_active,
        sort_order: destination.sort_order || 0,
    });

    const [uploading, setUploading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/content/destinations/${destination.id}`);
    }

    async function handleImageUpload(file: File) {
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const response = await fetch('/admin/content/destinations/image', {
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
            <Head title={`Edit ${destination.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title={`Edit: ${destination.name}`} />
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="rounded-lg border bg-card p-6 space-y-4">
                                <h2 className="text-lg font-medium">Informasi Destinasi</h2>
                                <FormField label="Nama Destinasi" error={errors.name} required>
                                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Slug" error={errors.slug} required>
                                    <input type="text" value={data.slug} onChange={(e) => setData('slug', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Deskripsi" error={errors.description} required>
                                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                            </div>
                            <div className="rounded-lg border bg-card p-6 space-y-4">
                                <h2 className="text-lg font-medium">Pengaturan</h2>
                                <FormField label="Urutan" error={errors.sort_order}>
                                    <input type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="is_featured" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} className="rounded" />
                                    <label htmlFor="is_featured" className="text-sm">Tampilkan sebagai Unggulan</label>
                                </div>
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
                        <FormActions processing={processing} onCancel={() => router.visit('/admin/content/destinations')} saveLabel="Simpan Perubahan" />
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Destinasi', href: '/admin/content/destinations' },
        { title: 'Edit', href: '#' },
    ],
};
