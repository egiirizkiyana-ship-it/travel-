import { Link } from '@inertiajs/react';
import { Home, ArrowLeft } from 'lucide-react';

interface ErrorProps {
    status: number;
}

const errorMessages: Record<number, { title: string; description: string }> = {
    403: {
        title: 'Akses Ditolak',
        description: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
    },
    404: {
        title: 'Halaman Tidak Ditemukan',
        description: 'Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.',
    },
    419: {
        title: 'Sesi Berakhir',
        description: 'Sesi Anda telah berakhir. Silakan muat ulang halaman dan coba lagi.',
    },
    429: {
        title: 'Terlalu Banyak Permintaan',
        description: 'Anda mengirim terlalu banyak permintaan. Silakan tunggu sebentar lalu coba lagi.',
    },
    500: {
        title: 'Kesalahan Server',
        description: 'Terjadi kesalahan pada server kami. Tim teknis sedang menangani masalah ini.',
    },
};

export default function Index({ status }: ErrorProps) {
    const error = errorMessages[status] || errorMessages[500];

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 px-4">
            <div className="text-center">
                <p className="font-heading text-7xl font-bold text-brand-emerald">{status}</p>
                <h1 className="mt-4 font-heading text-2xl font-bold text-brand-foreground">
                    {error.title}
                </h1>
                <p className="mt-2 text-brand-muted">{error.description}</p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-medium text-brand-foreground shadow-sm transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-emerald px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-dark"
                    >
                        <Home className="h-4 w-4" />
                        Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
