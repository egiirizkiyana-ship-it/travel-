import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

interface SeoHeadProps {
    title: string;
    description?: string;
    canonical?: string;
    image?: string | null;
    type?: string;
    noindex?: boolean;
}

export function SeoHead({
    title,
    description,
    canonical,
    image,
    type = 'website',
    noindex = false,
}: SeoHeadProps) {
     
    const pageProps = usePage().props as any;
    const appUrl: string = pageProps.appUrl || 'http://localhost:8000';
    const siteUrl = appUrl;
    const brandName: string = pageProps.site?.brandName || 'Havana Travel';
    const fullTitle = title.includes('|') ? title : `${title} | ${brandName}`;
    const url = canonical ? `${siteUrl}${canonical}` : undefined;
    const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}/storage/${image}`) : undefined;

    return (
        <Head title={fullTitle}>
            {description && <meta name="description" content={description} />}
            {url && <link rel="canonical" href={url} />}
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            <meta property="og:title" content={fullTitle} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={brandName} />
            {description && <meta property="og:description" content={description} />}
            {url && <meta property="og:url" content={url} />}
            {ogImage && <meta property="og:image" content={ogImage} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
            {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Head>
    );
}
