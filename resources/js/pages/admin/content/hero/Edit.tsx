import { Head, useForm, router } from '@inertiajs/react';
import { Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { StatusBadge } from '@/components/admin/StatusBadge';

interface HeroSlide {
    id: number;
    image: string;
    sort_order: number;
    is_active: boolean;
}

interface Hero {
    id: number;
    eyebrow: string;
    title: string;
    description: string;
    primary_button_text: string;
    primary_button_url: string;
    secondary_button_text: string;
    secondary_button_url: string;
    background_image: string;
    is_active: boolean;
    slides: HeroSlide[];
}

interface HeroEditProps {
    hero: Hero;
}

export default function Edit({ hero }: HeroEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        eyebrow: hero.eyebrow || '',
        title: hero.title || '',
        description: hero.description || '',
        primary_button_text: hero.primary_button_text || '',
        primary_button_url: hero.primary_button_url || '',
        secondary_button_text: hero.secondary_button_text || '',
        secondary_button_url: hero.secondary_button_url || '',
        background_image: hero.background_image || '',
        is_active: hero.is_active,
    });

    const [deleteSlideId, setDeleteSlideId] = useState<number | null>(null);
    const [uploadingBg, setUploadingBg] = useState(false);
    const [uploadingSlide, setUploadingSlide] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put('/admin/content/hero');
    }

    function handleDeleteSlide() {
        if (!deleteSlideId) {
            return;
        }

        router.delete(`/admin/content/hero/slides/${deleteSlideId}`);
        setDeleteSlideId(null);
    }

    async function handleBackgroundImageUpload(file: File) {
        setUploadingBg(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const response = await fetch('/admin/content/hero/image', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: formData,
            });

            if (!response.ok) {
throw new Error('Upload gagal');
}

            const result = await response.json();

            if (result.path) {
                setData('background_image', result.path);
            }
        } catch {
            alert('Gagal upload gambar. Silakan coba lagi.');
        } finally {
            setUploadingBg(false);
        }
    }

    async function handleAddSlide(file: File) {
        setUploadingSlide(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const uploadRes = await fetch('/admin/content/hero/slides/image', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: formData,
            });

            if (!uploadRes.ok) {
throw new Error('Upload gagal');
}

            const uploadResult = await uploadRes.json();

            if (uploadResult.path) {
                router.post('/admin/content/hero/slides', {
                    image: uploadResult.path,
                    sort_order: hero.slides.length + 1,
                    is_active: true,
                });
            }
        } catch {
            alert('Gagal upload slide. Silakan coba lagi.');
        } finally {
            setUploadingSlide(false);
        }
    }

    return (
        <>
            <Head title="Edit Hero" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Hero Section" description="Atur tampilan hero di halaman utama" />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 text-lg font-medium">Konten Hero</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField label="Eyebrow" error={errors.eyebrow} required>
                                <input
                                    type="text"
                                    value={data.eyebrow}
                                    onChange={(e) => setData('eyebrow', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                />
                            </FormField>

                            <FormField label="Judul" error={errors.title} required>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                />
                            </FormField>
                        </div>

                        <FormField label="Deskripsi" error={errors.description} required>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            />
                        </FormField>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 text-lg font-medium">Tombol</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField label="Tombol Utama - Teks">
                                <input
                                    type="text"
                                    value={data.primary_button_text}
                                    onChange={(e) => setData('primary_button_text', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                />
                            </FormField>

                            <FormField label="Tombol Utama - URL">
                                <input
                                    type="text"
                                    value={data.primary_button_url}
                                    onChange={(e) => setData('primary_button_url', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                />
                            </FormField>

                            <FormField label="Tombol Sekunder - Teks">
                                <input
                                    type="text"
                                    value={data.secondary_button_text}
                                    onChange={(e) => setData('secondary_button_text', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                />
                            </FormField>

                            <FormField label="Tombol Sekunder - URL">
                                <input
                                    type="text"
                                    value={data.secondary_button_url}
                                    onChange={(e) => setData('secondary_button_url', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                />
                            </FormField>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <h2 className="mb-4 text-lg font-medium">Gambar</h2>
                        <FormField label="Gambar Latar Belakang" error={errors.background_image}>
                            <ImageUploader
                                value={data.background_image}
                                onChange={(value) => setData('background_image', value)}
                                onFileSelect={handleBackgroundImageUpload}
                            />
                            {uploadingBg && (
                                <p className="mt-2 text-sm text-muted-foreground">Mengupload gambar...</p>
                            )}
                        </FormField>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-medium">Status</h2>
                                <p className="text-sm text-muted-foreground">
                                    Nonaktifkan hero jika tidak ingin ditampilkan
                                </p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                                <StatusBadge active={data.is_active} />
                            </label>
                        </div>
                    </div>

                    <FormActions
                        processing={processing}
                        onCancel={() => router.visit('/admin')}
                        saveLabel="Simpan Perubahan"
                    />
                </form>

                {/* Hero Slides */}
                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-medium">Hero Slides</h2>
                            <p className="text-sm text-muted-foreground">Gambar slideshow di hero section</p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {hero.slides.map((slide) => (
                            <div key={slide.id} className="relative rounded-lg border bg-muted/30 p-3">
                                <div className="aspect-video rounded bg-muted">
                                    {slide.image && (
                                        <img
                                            src={slide.image}
                                            alt=""
                                            className="h-full w-full rounded object-cover"
                                        />
                                    )}
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <StatusBadge active={slide.is_active} />
                                    <button
                                        type="button"
                                        onClick={() => setDeleteSlideId(slide.id)}
                                        className="text-destructive hover:text-destructive/80"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add Slide Button */}
                        <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-3">
                            <ImageUploader
                                onChange={() => {}}
                                onFileSelect={handleAddSlide}
                                label=""
                                accept="image/jpeg,image/png,image/webp"
                            />
                            {uploadingSlide && (
                                <p className="mt-2 text-xs text-muted-foreground">Mengupload...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={deleteSlideId !== null}
                onOpenChange={() => setDeleteSlideId(null)}
                title="Hapus Slide"
                description="Apakah Anda yakin ingin menghapus slide ini?"
                onConfirm={handleDeleteSlide}
            />
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Hero', href: '/admin/content/hero' },
    ],
};
