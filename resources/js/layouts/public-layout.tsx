'use client';

import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { BackToTop } from '@/components/public/back-to-top';
import { WhatsAppButton } from '@/components/public/whatsapp-button';
import { useLenis } from '@/hooks/use-lenis';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    useLenis();

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-16 lg:pt-20">{children}</main>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
        </div>
    );
}
