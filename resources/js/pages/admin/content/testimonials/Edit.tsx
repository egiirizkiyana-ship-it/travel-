import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { StarRating } from '@/components/admin/StarRating';

interface Testimonial {
    id: number;
    name: string;
    city: string;
    package: string;
    content: string;
    avatar: string;
    rating: number;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
}

interface TestimonialEditProps {
    testimonial: Testimonial;
}

export default function Edit({ testimonial }: TestimonialEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: testimonial.name || '',
        city: testimonial.city || '',
        package: testimonial.package || '',
        content: testimonial.content || '',
        avatar: testimonial.avatar || '',
        rating: testimonial.rating || 5,
        is_featured: testimonial.is_featured,
        is_active: testimonial.is_active,
        sort_order: testimonial.sort_order || 0,
    });

    const [uploading, setUploading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/content/testimonials/${testimonial.id}`);
    }

    async function handleImageUpload(file: File) {
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const response = await fetch('/admin/content/testimonials/image', {
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
                setData('avatar', result.path);
            }
        } catch {
            alert('Gagal upload gambar. Silakan coba lagi.');
        } finally {
            setUploading(false);
        }
    }

    return (
        <>
            <Head title={`Edit: ${testimonial.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title={`Edit: ${testimonial.name}`} />
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="rounded-lg border bg-card p-6 space-y-4">
                                <h2 className="text-lg font-medium">Informasi Testimoni</h2>
                                <FormField label="Nama" error={errors.name} required>
                                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Kota" error={errors.city} required>
                                    <input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Paket" error={errors.package}>
                                    <input type="text" value={data.package} onChange={(e) => setData('package', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Rating" error={errors.rating} required>
                                    <StarRating value={data.rating} onChange={(v) => setData('rating', v)} />
                                </FormField>
                                <FormField label="Isi Testimoni" error={errors.content} required>
                                    <textarea value={data.content} onChange={(e) => setData('content', e.target.value)} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
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
                            <h2 className="mb-4 text-lg font-medium">Avatar</h2>
                            <ImageUploader
                                value={data.avatar}
                                onChange={(value) => setData('avatar', value)}
                                onFileSelect={handleImageUpload}
                            />
                            {uploading && (
                                <p className="mt-2 text-sm text-muted-foreground">Mengupload gambar...</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-6">
                        <FormActions processing={processing} onCancel={() => router.visit('/admin/content/testimonials')} saveLabel="Simpan Perubahan" />
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Testimoni', href: '/admin/content/testimonials' },
        { title: 'Edit', href: '#' },
    ],
};
