'use client';

import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Paket Umroh', href: '/packages' },
    { label: 'Destinasi', href: '/destinations' },
    { label: 'Galeri', href: '/gallery' },
    { label: 'Testimoni', href: '/testimonials' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Kontak', href: '/contact' },
];

export function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { site } = usePage().props;
    const brandName = site?.brandName || siteConfig.brandName;
    const logoUrl = site?.logo || null;

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileOpen]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 transition-all duration-300 ${
                    scrolled ? 'shadow-sm' : ''
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className={`flex items-center justify-between transition-all duration-300 ${
                        scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'
                    }`}>
                        <Link href="/" className="flex shrink-0 items-center gap-2">
                            {logoUrl ? (
                                <img src={logoUrl} alt={brandName} className="h-10 w-10 rounded-lg object-contain lg:h-12 lg:w-12" />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-emerald text-white font-heading text-sm font-bold lg:h-12 lg:w-12">
                                    {brandName.charAt(0)}
                                </div>
                            )}
                            <span className="whitespace-nowrap font-heading text-lg font-bold text-brand-foreground lg:text-xl">
                                {brandName}
                            </span>
                        </Link>

                        <nav className="hidden min-w-0 items-center gap-0.5 xl:gap-1 lg:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="whitespace-nowrap rounded-md px-2 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-brand-foreground/70 transition-colors hover:bg-brand-secondary hover:text-brand-foreground"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden shrink-0 items-center lg:flex">
                            <Link
                                href="/contact"
                                className="inline-flex items-center rounded-lg bg-brand-emerald px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                            >
                                Konsultasi
                            </Link>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-brand-foreground lg:hidden"
                            onClick={() => setIsMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {isMobileOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
                        <div className="flex h-full flex-col">
                            <div className="flex items-center justify-between border-b border-border px-4 py-4">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    {logoUrl ? (
                                        <img src={logoUrl} alt={brandName} className="h-10 w-10 rounded-lg object-contain" />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-emerald text-white font-heading text-sm font-bold">
                                            {brandName.charAt(0)}
                                        </div>
                                    )}
                                    <span className="font-heading text-lg font-bold text-brand-foreground">
                                        {brandName}
                                    </span>
                                </Link>
                                <button
                                    type="button"
                                    className="rounded-md p-2 text-brand-muted hover:text-brand-foreground"
                                    onClick={() => setIsMobileOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto px-4 py-6">
                                <div className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className="rounded-md px-3 py-2.5 text-base font-medium text-brand-foreground transition-colors hover:bg-brand-secondary"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </nav>

                            <div className="border-t border-border px-4 py-6">
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex w-full items-center justify-center rounded-lg bg-brand-emerald px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                                >
                                    Konsultasi
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
