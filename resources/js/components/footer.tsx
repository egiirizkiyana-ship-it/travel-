'use client';

import { Link, usePage } from '@inertiajs/react';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { siteConfig } from '@/config/site';

const footerNav = [
    {
        title: 'Company',
        links: [
            { label: 'Tentang Kami', href: '/about' },
            { label: 'Kontak', href: '/contact' },
        ],
    },
    {
        title: 'Paket',
        links: [
            { label: 'Paket Umroh', href: '/packages' },
            { label: 'Destinasi', href: '/destinations' },
        ],
    },
    {
        title: 'Informasi',
        links: [
            { label: 'Galeri', href: '/gallery' },
            { label: 'Testimoni', href: '/testimonials' },
            { label: 'FAQ', href: '/faq' },
        ],
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { site } = usePage().props;
    const brandName = site?.brandName || siteConfig.brandName;
    const logoUrl = site?.logo || null;
    const instagram = site?.instagram ?? siteConfig.instagram;
    const facebook = site?.facebook ?? siteConfig.facebook;
    const youtube = site?.youtube ?? siteConfig.youtube;
    const phone = site?.phone || siteConfig.phone;
    const email = site?.email || siteConfig.email;
    const address = site?.address || siteConfig.address;

    return (
        <footer className="bg-brand-emerald text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-4 lg:py-8">
                    <div className="space-y-3">
                        <Link href="/" className="flex items-center gap-2">
                            {logoUrl ? (
                                <img src={logoUrl} alt={brandName} className="h-8 w-8 rounded-lg object-contain" />
                            ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 font-heading text-xs font-bold">
                                    {brandName.charAt(0)}
                                </div>
                            )}
                            <span className="font-heading text-base font-bold">
                                {brandName}
                            </span>
                        </Link>
                        <div className="flex gap-2">
                            {instagram && (
                                <a
                                    href={`https://instagram.com/${instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-3.5 w-3.5" />
                                </a>
                            )}
                            {facebook && (
                                <a
                                    href={`https://facebook.com/${facebook}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-3.5 w-3.5" />
                                </a>
                            )}
                            {youtube && (
                                <a
                                    href={`https://youtube.com/@${youtube}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="h-3.5 w-3.5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {footerNav.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-brand-gold">
                                {section.title}
                            </h3>
                            <ul className="mt-2 space-y-1.5">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/70 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-brand-gold">
                            Hubungi Kami
                        </h3>
                        <ul className="mt-2 space-y-1.5">
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-gold" />
                                <span className="text-sm text-white/70">
                                    {address}
                                </span>
                            </li>
                            <li>
                                <a
                                    href={`tel:${phone}`}
                                    className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                                >
                                    <Phone className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                                    {phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                                >
                                    <Mail className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
                                    {email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 py-3">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs text-white/50">
                            &copy; {currentYear} {brandName}. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
