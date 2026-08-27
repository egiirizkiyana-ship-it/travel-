import { Head, Link, useForm } from '@inertiajs/react';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';

interface Inquiry {
    id: number;
    name: string;
    phone: string;
    email: string;
    message: string;
    status: string;
    created_at: string;
    package: { name: string } | null;
}

interface InquiryShowProps {
    inquiry: Inquiry;
}

const statuses = [
    { value: 'new', label: 'Baru' },
    { value: 'contacted', label: 'Dihubungi' },
    { value: 'follow_up', label: 'Follow Up' },
    { value: 'converted', label: 'Konversi' },
    { value: 'closed', label: 'Selesai' },
];

export default function Show({ inquiry }: InquiryShowProps) {
    const { data, setData, patch, processing } = useForm({
        status: inquiry.status,
    });

    function handleStatusChange(e: React.FormEvent) {
        e.preventDefault();
        patch(`/admin/inquiries/${inquiry.id}/status`);
    }

    const whatsappUrl = `https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`;

    return (
        <>
            <Head title={`Pertanyaan: ${inquiry.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/inquiries" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                    <AdminPageHeader title={`Pertanyaan dari ${inquiry.name}`} />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-medium">Detail Pertanyaan</h2>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-sm text-muted-foreground">Nama</dt>
                                    <dd className="text-sm font-medium">{inquiry.name}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-muted-foreground">Telepon</dt>
                                    <dd className="text-sm font-medium">{inquiry.phone}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-muted-foreground">Email</dt>
                                    <dd className="text-sm font-medium">{inquiry.email || '-'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-muted-foreground">Paket</dt>
                                    <dd className="text-sm font-medium">{inquiry.package?.name || '-'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-muted-foreground">Tanggal</dt>
                                    <dd className="text-sm font-medium">{new Date(inquiry.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-medium">Pesan</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {inquiry.message || 'Tidak ada pesan'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-medium">Status</h2>
                            <form onSubmit={handleStatusChange} className="space-y-4">
                                <FormField label="Ubah Status">
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        {statuses.map((s) => (
                                            <option key={s.value} value={s.value}>{s.label}</option>
                                        ))}
                                    </select>
                                </FormField>
                                <FormActions processing={processing} saveLabel="Simpan Status" />
                            </form>
                        </div>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700"
                        >
                            <MessageCircle className="h-4 w-4" />
                            Chat WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Pertanyaan', href: '/admin/inquiries' },
        { title: 'Detail', href: '#' },
    ],
};
