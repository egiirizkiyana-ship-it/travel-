import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FormActions } from '@/components/admin/FormActions';
import { FormField } from '@/components/admin/FormField';
import { ImageUploader } from '@/components/admin/ImageUploader';
import type { Package, PackageFacility, PackageItinerary, PackageIncluded, PackageNotIncluded } from '@/types';

interface PackageEditProps {
    package: Package & {
        facilities: PackageFacility[];
        itineraries: PackageItinerary[];
        included: PackageIncluded[];
        notIncluded: PackageNotIncluded[];
    };
}

interface FacilityForm {
    name: string;
    description: string;
    icon: string;
    sort_order: number;
    is_active: boolean;
}

interface ItineraryForm {
    day_number: number;
    title: string;
    location: string;
    description: string;
    sort_order: number;
}

interface ItemForm {
    item: string;
    sort_order: number;
}

export default function Edit({ package: pkg }: PackageEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: pkg.name || '',
        slug: pkg.slug || '',
        duration: pkg.duration || '',
        description: pkg.description || '',
        price: pkg.price || 0,
        image: pkg.image || '',
        is_featured: pkg.is_featured,
        is_active: pkg.is_active,
        sort_order: pkg.sort_order || 0,
        meta_title: pkg.meta_title || '',
        meta_description: pkg.meta_description || '',
        departure_city: pkg.departure_city || '',
        airline: pkg.airline || '',
        hotel_madinah: pkg.hotel_madinah || '',
        hotel_madinah_distance: pkg.hotel_madinah_distance || '',
        hotel_madinah_room: pkg.hotel_madinah_room || '',
        hotel_makkah: pkg.hotel_makkah || '',
        hotel_makkah_distance: pkg.hotel_makkah_distance || '',
        hotel_makkah_room: pkg.hotel_makkah_room || '',
        flight_notes: pkg.flight_notes || '',
        facilities: (pkg.facilities ?? []).map((f) => ({
            name: f.name || '',
            description: f.description || '',
            icon: f.icon || '',
            sort_order: f.sort_order || 0,
            is_active: f.is_active ?? true,
        })) as FacilityForm[],
        itineraries: (pkg.itineraries ?? []).map((it) => ({
            day_number: it.day_number || 1,
            title: it.title || '',
            location: it.location || '',
            description: it.description || '',
            sort_order: it.sort_order || 0,
        })) as ItineraryForm[],
        included: (pkg.included ?? []).map((item) => ({
            item: item.item || '',
            sort_order: item.sort_order || 0,
        })) as ItemForm[],
        not_included: (pkg.notIncluded ?? []).map((item) => ({
            item: item.item || '',
            sort_order: item.sort_order || 0,
        })) as ItemForm[],
    });

    const [activeTab, setActiveTab] = useState<'basic' | 'travel' | 'itinerary' | 'inclusions' | 'seo'>('basic');
    const [uploading, setUploading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/content/packages/${pkg.id}`);
    }

    function addFacility() {
        setData('facilities', [...data.facilities, { name: '', description: '', icon: '', sort_order: 0, is_active: true }]);
    }

    function removeFacility(index: number) {
        setData('facilities', data.facilities.filter((_, i) => i !== index));
    }

    function addItinerary() {
        setData('itineraries', [...data.itineraries, { day_number: data.itineraries.length + 1, title: '', location: '', description: '', sort_order: 0 }]);
    }

    function removeItinerary(index: number) {
        setData('itineraries', data.itineraries.filter((_, i) => i !== index));
    }

    function addIncluded() {
        setData('included', [...data.included, { item: '', sort_order: 0 }]);
    }

    function removeIncluded(index: number) {
        setData('included', data.included.filter((_, i) => i !== index));
    }

    function addNotIncluded() {
        setData('not_included', [...data.not_included, { item: '', sort_order: 0 }]);
    }

    function removeNotIncluded(index: number) {
        setData('not_included', data.not_included.filter((_, i) => i !== index));
    }

    async function handleImageUpload(file: File) {
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const response = await fetch('/admin/content/packages/image', {
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
                setData('image', result.path);
            }
        } catch {
            alert('Gagal upload gambar. Silakan coba lagi.');
        } finally {
            setUploading(false);
        }
    }

    const tabs = [
        { key: 'basic', label: 'Informasi Dasar' },
        { key: 'travel', label: 'Detail Perjalanan' },
        { key: 'itinerary', label: 'Jadwal' },
        { key: 'inclusions', label: 'Termasuk/Tidak' },
        { key: 'seo', label: 'SEO' },
    ] as const;

    return (
        <>
            <Head title={`Edit ${pkg.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AdminPageHeader title={`Edit: ${pkg.name}`} />

                <form onSubmit={handleSubmit}>
                    {/* Tabs */}
                    <div className="flex gap-1 rounded-lg border bg-card p-1 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                    activeTab === tab.key
                                        ? 'bg-emerald-600 text-white'
                                        : 'text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            {/* Basic Info */}
                            {activeTab === 'basic' && (
                                <>
                                    <div className="rounded-lg border bg-card p-6 space-y-4">
                                        <h2 className="text-lg font-medium">Informasi Paket</h2>

                                        <FormField label="Nama Paket" error={errors.name} required>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </FormField>

                                        <FormField label="Slug" error={errors.slug} required>
                                            <input
                                                type="text"
                                                value={data.slug}
                                                onChange={(e) => setData('slug', e.target.value)}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </FormField>

                                        <FormField label="Durasi" error={errors.duration} required>
                                            <input
                                                type="text"
                                                value={data.duration}
                                                onChange={(e) => setData('duration', e.target.value)}
                                                placeholder="contoh: 12 Hari / 11 Malam"
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </FormField>

                                        <FormField label="Deskripsi" error={errors.description} required>
                                            <textarea
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                rows={6}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </FormField>

                                        <FormField label="Harga (Rp)" error={errors.price} required>
                                            <input
                                                type="number"
                                                value={data.price}
                                                onChange={(e) => setData('price', parseFloat(e.target.value) || 0)}
                                                min="0"
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </FormField>
                                    </div>

                                    <div className="rounded-lg border bg-card p-6 space-y-4">
                                        <h2 className="text-lg font-medium">Pengaturan</h2>

                                        <FormField label="Urutan" error={errors.sort_order}>
                                            <input
                                                type="number"
                                                value={data.sort_order}
                                                onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </FormField>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="is_featured"
                                                checked={data.is_featured}
                                                onChange={(e) => setData('is_featured', e.target.checked)}
                                                className="rounded"
                                            />
                                            <label htmlFor="is_featured" className="text-sm">Pilihan Jamaah</label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="rounded"
                                            />
                                            <label htmlFor="is_active" className="text-sm">Aktif</label>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Travel Details */}
                            {activeTab === 'travel' && (
                                <div className="rounded-lg border bg-card p-6 space-y-4">
                                    <h2 className="text-lg font-medium">Detail Perjalanan</h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField label="Kota Berangkat" error={errors.departure_city}>
                                            <input
                                                type="text"
                                                value={data.departure_city}
                                                onChange={(e) => setData('departure_city', e.target.value)}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </FormField>

                                        <FormField label="Maskapai" error={errors.airline}>
                                            <input
                                                type="text"
                                                value={data.airline}
                                                onChange={(e) => setData('airline', e.target.value)}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </FormField>
                                    </div>

                                    <FormField label="Catatan Penerbangan" error={errors.flight_notes}>
                                        <textarea
                                            value={data.flight_notes}
                                            onChange={(e) => setData('flight_notes', e.target.value)}
                                            rows={2}
                                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </FormField>

                                    <div className="pt-4 border-t space-y-4">
                                        <h3 className="text-md font-medium">Hotel Madinah</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <FormField label="Nama Hotel" error={errors.hotel_madinah}>
                                                <input
                                                    type="text"
                                                    value={data.hotel_madinah}
                                                    onChange={(e) => setData('hotel_madinah', e.target.value)}
                                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </FormField>
                                            <FormField label="Jarak" error={errors.hotel_madinah_distance}>
                                                <input
                                                    type="text"
                                                    value={data.hotel_madinah_distance}
                                                    onChange={(e) => setData('hotel_madinah_distance', e.target.value)}
                                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </FormField>
                                            <FormField label="Tipe Kamar" error={errors.hotel_madinah_room}>
                                                <input
                                                    type="text"
                                                    value={data.hotel_madinah_room}
                                                    onChange={(e) => setData('hotel_madinah_room', e.target.value)}
                                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </FormField>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t space-y-4">
                                        <h3 className="text-md font-medium">Hotel Makkah</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <FormField label="Nama Hotel" error={errors.hotel_makkah}>
                                                <input
                                                    type="text"
                                                    value={data.hotel_makkah}
                                                    onChange={(e) => setData('hotel_makkah', e.target.value)}
                                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </FormField>
                                            <FormField label="Jarak" error={errors.hotel_makkah_distance}>
                                                <input
                                                    type="text"
                                                    value={data.hotel_makkah_distance}
                                                    onChange={(e) => setData('hotel_makkah_distance', e.target.value)}
                                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </FormField>
                                            <FormField label="Tipe Kamar" error={errors.hotel_makkah_room}>
                                                <input
                                                    type="text"
                                                    value={data.hotel_makkah_room}
                                                    onChange={(e) => setData('hotel_makkah_room', e.target.value)}
                                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </FormField>
                                        </div>
                                    </div>

                                    {/* Facilities */}
                                    <div className="pt-4 border-t space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-md font-medium">Fasilitas</h3>
                                            <button
                                                type="button"
                                                onClick={addFacility}
                                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                            >
                                                <Plus className="h-3 w-3" /> Tambah
                                            </button>
                                        </div>
                                        {data.facilities.map((f, i) => (
                                            <div key={i} className="flex gap-2 items-start">
                                                <div className="flex-1 grid grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        value={f.name}
                                                        onChange={(e) => {
                                                            const updated = [...data.facilities];
                                                            updated[i].name = e.target.value;
                                                            setData('facilities', updated);
                                                        }}
                                                        placeholder="Nama fasilitas"
                                                        className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={f.description}
                                                        onChange={(e) => {
                                                            const updated = [...data.facilities];
                                                            updated[i].description = e.target.value;
                                                            setData('facilities', updated);
                                                        }}
                                                        placeholder="Deskripsi (opsional)"
                                                        className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFacility(i)}
                                                    className="mt-1 rounded-lg p-2 text-red-500 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Itinerary */}
                            {activeTab === 'itinerary' && (
                                <div className="rounded-lg border bg-card p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-medium">Jadwal Perjalanan</h2>
                                        <button
                                            type="button"
                                            onClick={addItinerary}
                                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                        >
                                            <Plus className="h-3 w-3" /> Tambah Hari
                                        </button>
                                    </div>
                                    {data.itineraries.map((it, i) => (
                                        <div key={i} className="rounded-lg border p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">
                                                        {it.day_number}
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={it.title}
                                                        onChange={(e) => {
                                                            const updated = [...data.itineraries];
                                                            updated[i].title = e.target.value;
                                                            setData('itineraries', updated);
                                                        }}
                                                        placeholder="Judul hari ini"
                                                        className="w-64 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <button type="button" onClick={() => removeItinerary(i)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="number"
                                                    value={it.day_number}
                                                    onChange={(e) => {
                                                        const updated = [...data.itineraries];
                                                        updated[i].day_number = parseInt(e.target.value) || 1;
                                                        setData('itineraries', updated);
                                                    }}
                                                    min="1"
                                                    placeholder="Hari ke-"
                                                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={it.location}
                                                    onChange={(e) => {
                                                        const updated = [...data.itineraries];
                                                        updated[i].location = e.target.value;
                                                        setData('itineraries', updated);
                                                    }}
                                                    placeholder="Lokasi (opsional)"
                                                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            </div>
                                            <textarea
                                                value={it.description}
                                                onChange={(e) => {
                                                    const updated = [...data.itineraries];
                                                    updated[i].description = e.target.value;
                                                    setData('itineraries', updated);
                                                }}
                                                rows={2}
                                                placeholder="Deskripsi kegiatan"
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Inclusions */}
                            {activeTab === 'inclusions' && (
                                <div className="space-y-6">
                                    <div className="rounded-lg border bg-card p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-medium">Termasuk</h2>
                                            <button
                                                type="button"
                                                onClick={addIncluded}
                                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                            >
                                                <Plus className="h-3 w-3" /> Tambah
                                            </button>
                                        </div>
                                        {data.included.map((item, i) => (
                                            <div key={i} className="flex gap-2 items-center">
                                                <span className="text-emerald-500">✓</span>
                                                <input
                                                    type="text"
                                                    value={item.item}
                                                    onChange={(e) => {
                                                        const updated = [...data.included];
                                                        updated[i].item = e.target.value;
                                                        setData('included', updated);
                                                    }}
                                                    placeholder="Item yang termasuk"
                                                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                                <button type="button" onClick={() => removeIncluded(i)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="rounded-lg border bg-card p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-medium">Tidak Termasuk</h2>
                                            <button
                                                type="button"
                                                onClick={addNotIncluded}
                                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                            >
                                                <Plus className="h-3 w-3" /> Tambah
                                            </button>
                                        </div>
                                        {data.not_included.map((item, i) => (
                                            <div key={i} className="flex gap-2 items-center">
                                                <span className="text-red-500">×</span>
                                                <input
                                                    type="text"
                                                    value={item.item}
                                                    onChange={(e) => {
                                                        const updated = [...data.not_included];
                                                        updated[i].item = e.target.value;
                                                        setData('not_included', updated);
                                                    }}
                                                    placeholder="Item yang tidak termasuk"
                                                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                                <button type="button" onClick={() => removeNotIncluded(i)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* SEO */}
                            {activeTab === 'seo' && (
                                <div className="rounded-lg border bg-card p-6 space-y-4">
                                    <h2 className="text-lg font-medium">SEO</h2>
                                    <FormField label="Meta Title" error={errors.meta_title}>
                                        <input
                                            type="text"
                                            value={data.meta_title}
                                            onChange={(e) => setData('meta_title', e.target.value)}
                                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </FormField>
                                    <FormField label="Meta Description" error={errors.meta_description}>
                                        <textarea
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            rows={3}
                                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </FormField>
                                </div>
                            )}
                        </div>

                        {/* Image Sidebar */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-medium">Gambar</h2>
                            <ImageUploader
                                value={data.image}
                                onChange={(value) => setData('image', value)}
                                onFileSelect={handleImageUpload}
                            />
                            {uploading && (
                                <p className="mt-2 text-sm text-muted-foreground">Mengupload gambar...</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <FormActions
                            processing={processing}
                            onCancel={() => router.visit('/admin/content/packages')}
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
        { title: 'Paket Umroh', href: '/admin/content/packages' },
        { title: 'Edit', href: '#' },
    ],
};
