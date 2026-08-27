import type { Auth } from '@/types/auth';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

export interface SiteProps {
    brandName?: string;
    tagline?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    logo?: string | null;
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            site: SiteProps;
            [key: string]: unknown;
        };
    }
}
