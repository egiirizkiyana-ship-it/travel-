import { Head, useForm, router } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';

const availableIcons = [
    'ShieldCheck',
    'Users',
    'HeartHandshake',
    'BadgeCheck',
    'Headphones',
    'Plane',
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        icon: 'ShieldCheck',
        sort_order: 0,
        is_active: true,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/content/features');
    }

    return (
        <>
            <Head title="Tambah Keunggulan" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Tambah Keunggulan" />

                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 space-y-4">
                        <FormField label="Judul" error={errors.title} required>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            />
                        </FormField>

                        <FormField label="Deskripsi" error={errors.description} required>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            />
                        </FormField>

                        <FormField label="Icon" error={errors.icon} required>
                            <select
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            >
                                {availableIcons.map((icon) => (
                                    <option key={icon} value={icon}>
                                        {icon}
                                    </option>
                                ))}
                            </select>
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
                            onCancel={() => router.visit('/admin/content/features')}
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
        { title: 'Keunggulan', href: '/admin/content/features' },
        { title: 'Tambah', href: '#' },
    ],
};
