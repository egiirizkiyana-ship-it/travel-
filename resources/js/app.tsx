import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import PublicLayout from '@/layouts/public-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Havana Travel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
         
        const page = pages[`./pages/${name}.tsx`] as any;

        return page;
    },
    layout: (name) => {
        switch (true) {
            case name?.startsWith('public/'):
                return PublicLayout;
            case name === 'welcome':
                return null;
            case name?.startsWith('auth/'):
                return AuthLayout;
            case name?.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            case name?.startsWith('admin/'):
                return AppLayout;
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#1A7FA0',
    },
});

// This will set light / dark mode on load...
initializeTheme();
