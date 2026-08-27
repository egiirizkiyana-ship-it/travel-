'use client';

import { MessageCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface ConsultationCTAProps {
    packageName?: string;
    variant?: 'default' | 'inline';
}

export function ConsultationCTA({ packageName, variant = 'default' }: ConsultationCTAProps) {
    const { site } = usePage().props;
    const whatsapp = site?.whatsapp || siteConfig.whatsapp;
    const message = packageName
        ? `Assalamu'alaikum, saya ingin berkonsultasi mengenai paket ${packageName}.`
        : 'Assalamu\'alaikum, saya ingin berkonsultasi mengenai perjalanan Umroh.';

    const waUrl = buildWhatsAppUrl(whatsapp, message);

    if (variant === 'inline') {
        return (
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-emerald px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
                <MessageCircle className="h-4 w-4" />
                Konsultasi via WhatsApp
            </a>
        );
    }

    return (
        <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-emerald p-4 text-white font-medium hover:bg-brand-dark transition-colors"
        >
            <MessageCircle className="h-5 w-5" />
            Konsultasi via WhatsApp
        </a>
    );
}
