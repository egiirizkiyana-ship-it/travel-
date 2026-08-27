'use client';

import { MessageCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function WhatsAppButton() {
    const { site } = usePage().props;
    const whatsapp = site?.whatsapp || siteConfig.whatsapp;
    const url = buildWhatsAppUrl(
        whatsapp,
        'Halo Havana Travel, saya tertarik dengan paket umroh.',
    );

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-[#20BA5C]"
        >
            <MessageCircle className="h-6 w-6" />
        </a>
    );
}
