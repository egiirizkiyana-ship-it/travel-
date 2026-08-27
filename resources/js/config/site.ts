export const siteConfig = {
    brandName: 'Havana Travel',
    tagline: 'Perjalanan Ibadah yang Penuh Makna',
    phone: '+62 21 1234 5678',
    whatsapp: '+62 812 3456 7890',
    email: 'info@havanatravel.co.id',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta',
    instagram: '',
    facebook: '',
    youtube: '',
} as const;

export type SiteConfig = typeof siteConfig;
