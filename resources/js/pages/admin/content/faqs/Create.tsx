import { Head, useForm, router } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        question: '',
        answer: '',
        sort_order: 0,
        is_active: true,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/content/faqs');
    }

    return (
        <>
            <Head title="Tambah FAQ" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Tambah FAQ" />
                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 space-y-4">
                        <FormField label="Pertanyaan" error={errors.question} required>
                            <input type="text" value={data.question} onChange={(e) => setData('question', e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                        </FormField>
                        <FormField label="Jawaban" error={errors.answer} required>
                            <textarea value={data.answer} onChange={(e) => setData('answer', e.target.value)} rows={5} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                        </FormField>
                        <FormField label="Urutan" error={errors.sort_order}>
                            <input type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                        </FormField>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded" />
                            <label htmlFor="is_active" className="text-sm">Aktif</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <FormActions processing={processing} onCancel={() => router.visit('/admin/content/faqs')} />
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'FAQ', href: '/admin/content/faqs' },
        { title: 'Tambah', href: '#' },
    ],
};
