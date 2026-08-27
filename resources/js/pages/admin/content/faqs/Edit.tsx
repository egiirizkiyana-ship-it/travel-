import { Head, useForm, router } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';

interface Faq {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
}

interface FaqEditProps {
    faq: Faq;
}

export default function Edit({ faq }: FaqEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        question: faq.question || '',
        answer: faq.answer || '',
        sort_order: faq.sort_order || 0,
        is_active: faq.is_active,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/content/faqs/${faq.id}`);
    }

    return (
        <>
            <Head title="Edit FAQ" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Edit FAQ" />
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
                        <FormActions processing={processing} onCancel={() => router.visit('/admin/content/faqs')} saveLabel="Simpan Perubahan" />
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'FAQ', href: '/admin/content/faqs' },
        { title: 'Edit', href: '#' },
    ],
};
