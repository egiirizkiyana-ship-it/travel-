import { Head, Link } from '@inertiajs/react';
import { FileText, Globe, Image, MessageSquare, Package, Users, Eye, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const sections = [
    { title: 'Hero Section', icon: FileText, href: '/admin/content/hero', description: 'Atur hero banner dan slider' },
    { title: 'Tentang Kami', icon: FileText, href: '/admin/content/about', description: 'Atur konten tentang kami' },
    { title: 'Paket Umroh', icon: Package, href: '/admin/content/packages', description: 'Kelola paket perjalanan' },
    { title: 'Destinasi', icon: Globe, href: '/admin/content/destinations', description: 'Kelola destinasi wisata' },
    { title: 'Galeri', icon: Image, href: '/admin/content/gallery', description: 'Kelola galeri foto' },
    { title: 'Testimoni', icon: MessageSquare, href: '/admin/content/testimonials', description: 'Kelola testimoni jamaah' },
    { title: 'FAQ', icon: FileText, href: '/admin/content/faqs', description: 'Kelola pertanyaan umum' },
    { title: 'Tim Kami', icon: Users, href: '/admin/content/team-members', description: 'Kelola anggota tim' },
    { title: 'Visi & Misi', icon: Eye, href: '/admin/content/visions', description: 'Kelola visi dan misi' },
    { title: 'Sejarah', icon: History, href: '/admin/content/histories', description: 'Kelola sejarah perusahaan' },
];

export default function Content() {
    return (
        <>
            <Head title="Content Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
                    <p className="text-sm text-muted-foreground">
                        Kelola semua konten website Anda
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sections.map((section) => (
                        <Link key={section.title} href={section.href}>
                            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <section.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-base">{section.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {section.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

Content.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Content', href: '/admin/content' },
    ],
};
