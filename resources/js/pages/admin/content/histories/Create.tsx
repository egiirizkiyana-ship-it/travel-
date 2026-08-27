import { Head, useForm, router } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        year: '',
        title: '',
        description: '',
        image: '' as string | File,
        sort_order: 0,
        is_active: true,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/content/histories');
    }

    function handleFileSelect(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        router.post('/admin/content/histories/image', formData, {
            preserveState: true,
        });
    }

    return (
        <>
            <Head title="Tambah Sejarah" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Tambah Sejarah" />
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="rounded-lg border bg-card p-6 space-y-4">
                                <h2 className="text-lg font-medium">Informasi Sejarah</h2>
                                <FormField label="Tahun" error={errors.year} required>
                                    <input
                                        type="text"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        placeholder="contoh: 2020"
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                    />
                                </FormField>
                                <FormField label="Judul" error={errors.title} required>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                    />
                                </FormField>
                                <FormField label="Deskripsi" error={errors.description}>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                    />
                                </FormField>
                                <FormField label="Urutan" error={errors.sort_order}>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                    />
                                </FormField>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded"
                                    />
                                    <label htmlFor="is_active" className="text-sm">Aktif</label>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-medium">Gambar</h2>
                            <ImageUploader
                                value={typeof data.image === 'string' ? data.image : ''}
                                onChange={(value) => setData('image', value)}
                                onFileSelect={handleFileSelect}
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <FormActions
                            processing={processing}
                            onCancel={() => router.visit('/admin/content/histories')}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Sejarah', href: '/admin/content/histories' },
        { title: 'Tambah', href: '#' },
    ],
};
