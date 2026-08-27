import { Head, Link } from '@inertiajs/react';
import { Package, MessageSquare, Image, FileText, Globe, HelpCircle, Plus } from 'lucide-react';
import { InquiryStatusBadge } from '@/components/admin/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Inquiry {
    id: number;
    name: string;
    phone: string;
    status: string;
    created_at: string;
    package: { name: string } | null;
}

interface DashboardStats {
    totalPackages: number;
    totalDestinations: number;
    totalGallery: number;
    totalTestimonials: number;
    totalFaq: number;
    newInquiries: number;
}

interface DashboardProps {
    stats: DashboardStats;
    recentInquiries: Inquiry[];
}

export default function Dashboard({ stats, recentInquiries }: DashboardProps) {
    const statCards = [
        { title: 'Total Paket', value: stats.totalPackages, icon: Package, href: '/admin/content/packages' },
        { title: 'Total Destinasi', value: stats.totalDestinations, icon: Globe, href: '/admin/content/destinations' },
        { title: 'Galeri', value: stats.totalGallery, icon: Image, href: '/admin/content/gallery' },
        { title: 'Testimoni', value: stats.totalTestimonials, icon: MessageSquare, href: '/admin/content/testimonials' },
        { title: 'FAQ', value: stats.totalFaq, icon: HelpCircle, href: '/admin/content/faqs' },
        { title: 'Pertanyaan Baru', value: stats.newInquiries, icon: FileText, href: '/admin/inquiries' },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Selamat datang di CMS Havana Travel</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {statCards.map((card) => (
                        <Link key={card.title} href={card.href}>
                            <Card className="transition-colors hover:bg-muted/50">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                                    <card.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{card.value}</div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-medium">Pertanyaan Terbaru</h2>
                            <Link href="/admin/inquiries" className="text-sm text-primary hover:underline">Lihat Semua</Link>
                        </div>
                        {recentInquiries.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Belum ada pertanyaan</p>
                        ) : (
                            <div className="space-y-3">
                                {recentInquiries.map((inquiry) => (
                                    <Link
                                        key={inquiry.id}
                                        href={`/admin/inquiries/${inquiry.id}`}
                                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                                    >
                                        <div>
                                            <p className="text-sm font-medium">{inquiry.name}</p>
                                            <p className="text-xs text-muted-foreground">{inquiry.package?.name || 'Tanpa paket'}</p>
                                        </div>
                                        <InquiryStatusBadge status={inquiry.status} />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 text-lg font-medium">Aksi Cepat</h2>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <Link href="/admin/content/packages/create" className="inline-flex items-center gap-2 rounded-lg border p-3 text-sm font-medium hover:bg-muted/50">
                                <Plus className="h-4 w-4" /> Tambah Paket
                            </Link>
                            <Link href="/admin/content/gallery/create" className="inline-flex items-center gap-2 rounded-lg border p-3 text-sm font-medium hover:bg-muted/50">
                                <Plus className="h-4 w-4" /> Tambah Galeri
                            </Link>
                            <Link href="/admin/content/testimonials/create" className="inline-flex items-center gap-2 rounded-lg border p-3 text-sm font-medium hover:bg-muted/50">
                                <Plus className="h-4 w-4" /> Tambah Testimoni
                            </Link>
                            <Link href="/admin/content/destinations/create" className="inline-flex items-center gap-2 rounded-lg border p-3 text-sm font-medium hover:bg-muted/50">
                                <Plus className="h-4 w-4" /> Tambah Destinasi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
    ],
};
