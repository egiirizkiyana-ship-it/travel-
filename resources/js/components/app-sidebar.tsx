import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    FileText,
    Image,
    MessageSquare,
    Settings,
    Globe,
    HelpCircle,
    Star,
    Package,
    MessageCircle,
    Users,
    Eye,
    History,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
    },
];

const contentNavItems = [
    {
        title: 'Hero',
        href: '/admin/content/hero',
        icon: FileText,
    },
    {
        title: 'Tentang Kami',
        href: '/admin/content/about',
        icon: FileText,
    },
    {
        title: 'Keunggulan',
        href: '/admin/content/features',
        icon: Star,
    },
    {
        title: 'Paket Umroh',
        href: '/admin/content/packages',
        icon: Package,
    },
    {
        title: 'Destinasi',
        href: '/admin/content/destinations',
        icon: Globe,
    },
    {
        title: 'Galeri',
        href: '/admin/content/gallery',
        icon: Image,
    },
    {
        title: 'Testimoni',
        href: '/admin/content/testimonials',
        icon: MessageSquare,
    },
    {
        title: 'FAQ',
        href: '/admin/content/faqs',
        icon: HelpCircle,
    },
    {
        title: 'Tim Kami',
        href: '/admin/content/team-members',
        icon: Users,
    },
    {
        title: 'Visi & Misi',
        href: '/admin/content/visions',
        icon: Eye,
    },
    {
        title: 'Sejarah',
        href: '/admin/content/histories',
        icon: History,
    },
];

const managementNavItems = [
    {
        title: 'Media Library',
        href: '/admin/media',
        icon: Image,
    },
    {
        title: 'Pertanyaan',
        href: '/admin/inquiries',
        icon: MessageCircle,
    },
    {
        title: 'Pengaturan',
        href: '/admin/settings',
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                <SidebarSeparator />

                <NavMain items={contentNavItems} />

                <SidebarSeparator />

                <NavMain items={managementNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
