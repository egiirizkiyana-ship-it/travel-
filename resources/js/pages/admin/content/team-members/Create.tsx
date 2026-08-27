import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        position: '',
        bio: '',
        photo: '',
        sort_order: 0,
        is_active: true,
    });

    const [uploading, setUploading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/content/team-members');
    }

    async function handleImageUpload(file: File) {
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const response = await fetch('/admin/content/team-members/image', {
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
                setData('photo', result.path);
            }
        } catch {
            alert('Gagal upload gambar. Silakan coba lagi.');
        } finally {
            setUploading(false);
        }
    }

    return (
        <>
            <Head title="Tambah Anggota Tim" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Tambah Anggota Tim" />
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="rounded-lg border bg-card p-6 space-y-4">
                                <h2 className="text-lg font-medium">Informasi Anggota</h2>
                                <FormField label="Nama" error={errors.name} required>
                                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Posisi" error={errors.position} required>
                                    <input type="text" value={data.position} onChange={(e) => setData('position', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                                </FormField>
                                <FormField label="Bio" error={errors.bio}>
                                    <textarea value={data.bio} onChange={(e) => setData('bio', e.target.value)} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
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
                            <h2 className="mb-4 text-lg font-medium">Foto</h2>
                            <ImageUploader value={data.photo} onChange={(value) => setData('photo', value)} onFileSelect={handleImageUpload} />
                            {uploading && (
                                <p className="mt-2 text-sm text-muted-foreground">Mengupload gambar...</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-6">
                        <FormActions processing={processing} onCancel={() => router.visit('/admin/content/team-members')} />
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Tim', href: '/admin/content/team-members' },
        { title: 'Tambah', href: '#' },
    ],
};
