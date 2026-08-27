import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';
import { ImagePreview } from '@/components/admin/ImagePreview';
import { StatusBadge } from '@/components/admin/StatusBadge';

interface About {
    id: number;
    eyebrow: string;
    title: string;
    description: string;
    images: string[];
    button_text: string;
    button_url: string;
    is_active: boolean;
}

interface AboutEditProps {
    about: About;
}

export default function Edit({ about }: AboutEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        eyebrow: about.eyebrow || '',
        title: about.title || '',
        description: about.description || '',
        images: about.images || [],
        button_text: about.button_text || '',
        button_url: about.button_url || '',
        is_active: about.is_active,
    });

    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put('/admin/content/about');
    }

    async function uploadFile(file: File): Promise<string | null> {
        const formData = new FormData();
        formData.append('file', file);
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        try {
            const response = await fetch('/admin/content/about/image', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Upload gagal');

            const result = await response.json();
            return result.path || null;
        } catch {
            alert('Gagal upload gambar. Silakan coba lagi.');
            return null;
        }
    }

    async function handleAddImage(file: File) {
        setUploading(true);
        const path = await uploadFile(file);
        if (path) {
            setData('images', [...data.images, path]);
        }
        setUploading(false);
    }

    async function handleReplaceImage(index: number, file: File) {
        setUploading(true);
        const path = await uploadFile(file);
        if (path) {
            const updated = [...data.images];
            updated[index] = path;
            setData('images', updated);
        }
        setUploading(false);
    }

    function handleRemoveImage(index: number) {
        setData('images', data.images.filter((_, i) => i !== index));
    }

    function handleDrag(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleAddImage(file);
        }
    }

    return (
        <>
            <Head title="Edit Tentang Kami" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title="Tentang Kami" description="Atur konten section tentang kami" />

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="rounded-lg border bg-card p-6">
                                <h2 className="mb-4 text-lg font-medium">Konten</h2>
                                <div className="space-y-4">
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

                                    <FormField label="Deskripsi" error={errors.description} required>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={5}
                                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </FormField>

                                    <FormField label="Tombol - Teks">
                                        <input
                                            type="text"
                                            value={data.button_text}
                                            onChange={(e) => setData('button_text', e.target.value)}
                                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </FormField>

                                    <FormField label="Tombol - URL">
                                        <input
                                            type="text"
                                            value={data.button_url}
                                            onChange={(e) => setData('button_url', e.target.value)}
                                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </FormField>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-card p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-medium">Status</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Nonaktifkan jika section tidak ingin ditampilkan
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
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-medium">Gambar</h2>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Upload beberapa gambar untuk ditampilkan di section Tentang Kami.
                            </p>

                            {errors.images && (
                                <p className="mb-2 text-sm text-destructive">{errors.images}</p>
                            )}

                            {data.images.length > 0 && (
                                <div className="mb-4 grid grid-cols-3 gap-3">
                                    {data.images.map((image, index) => (
                                        <div key={index} className="group relative">
                                            <label className="cursor-pointer block">
                                                <ImagePreview
                                                    src={image}
                                                    alt={`Gambar ${index + 1}`}
                                                    className="h-28 w-full rounded-lg object-cover"
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleReplaceImage(index, file);
                                                    }}
                                                    className="hidden"
                                                />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/90"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('about-add-image')?.click()}
                                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                                    dragActive
                                        ? 'border-primary bg-primary/5'
                                        : 'border-muted-foreground/25 hover:border-primary/50'
                                }`}
                            >
                                <Plus className="h-8 w-8 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {uploading ? 'Mengupload...' : 'Klik atau seret gambar ke sini'}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    JPG, PNG, atau WebP (maks. 5MB per gambar)
                                </p>
                            </div>
                            <input
                                id="about-add-image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleAddImage(file);
                                }}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <FormActions
                            processing={processing}
                            onCancel={() => router.visit('/admin')}
                            saveLabel="Simpan Perubahan"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Tentang Kami', href: '/admin/content/about' },
    ],
};
