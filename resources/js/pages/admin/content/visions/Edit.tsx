import { Head, useForm, router } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';

interface Vision {
    id: number;
    type: string;
    title: string;
    description: string;
    sort_order: number;
    is_active: boolean;
}

interface VisionEditProps {
    vision: Vision;
}

export default function Edit({ vision }: VisionEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        type: vision.type || 'vision',
        description: vision.description || '',
        sort_order: vision.sort_order || 0,
        is_active: vision.is_active,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/content/visions/${vision.id}`);
    }

    return (
        <>
            <Head title="Edit Visi & Misi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Edit Visi & Misi" />
                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 space-y-4">
                        <FormField label="Tipe" error={errors.type} required>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="vision">Visi</option>
                                <option value="mission">Misi</option>
                            </select>
                        </FormField>

                        <FormField label="Deskripsi" error={errors.description} required>
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

                    <div className="mt-4">
                        <FormActions
                            processing={processing}
                            onCancel={() => router.visit('/admin/content/visions')}
                            saveLabel="Simpan Perubahan"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Visi & Misi', href: '/admin/content/visions' },
        { title: 'Edit', href: '#' },
    ],
};
