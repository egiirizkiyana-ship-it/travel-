import { Head, useForm } from '@inertiajs/react';
import { Settings as SettingsIcon, Phone, Globe, Image } from 'lucide-react';
import { FormActions } from '@/components/admin/FormActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsProps {
    settings: Record<string, string>;
}

interface SettingSection {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    fields: { key: string; label: string; type: string }[];
}

const sections: SettingSection[] = [
    {
        title: 'Umum',
        icon: SettingsIcon,
        fields: [
            { key: 'company_name', label: 'Nama Perusahaan', type: 'text' },
            { key: 'tagline', label: 'Tagline', type: 'text' },
        ],
    },
    {
        title: 'Kontak',
        icon: Phone,
        fields: [
            { key: 'phone', label: 'Telepon', type: 'text' },
            { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'address', label: 'Alamat', type: 'textarea' },
        ],
    },
    {
        title: 'Media Sosial',
        icon: Globe,
        fields: [
            { key: 'instagram', label: 'Instagram', type: 'text' },
            { key: 'facebook', label: 'Facebook', type: 'text' },
            { key: 'youtube', label: 'YouTube', type: 'text' },
        ],
    },
];

export default function Settings({ settings }: SettingsProps) {
    const { data, setData, put, processing, wasSuccessful } = useForm({
        settings: sections
            .flatMap((section) => section.fields)
            .map((field) => ({
                key: field.key,
                value: settings[field.key] || '',
            })),
        logo: settings.logo || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put('/admin/settings');
    }

    function updateSetting(key: string, value: string) {
        setData(
            'settings',
            data.settings.map((s) => (s.key === key ? { ...s, value } : s))
        );
    }

    return (
        <>
            <Head title="Pengaturan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Pengaturan Website</h1>
                    <p className="text-sm text-muted-foreground">Kelola informasi website Anda</p>
                </div>

                {wasSuccessful && (
                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                        Pengaturan berhasil disimpan.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Image className="h-5 w-5" />
                                    Logo Website
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground">
                                        Path Logo
                                    </label>
                                    <input
                                        type="text"
                                        value={data.logo}
                                        onChange={(e) => setData('logo', e.target.value)}
                                        placeholder="/images/logo.svg"
                                        className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Path file logo relatif dari folder public (misal: /images/logo.svg)
                                    </p>
                                </div>
                                {data.logo && (
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Preview
                                        </label>
                                        <img
                                            src={data.logo}
                                            alt="Logo preview"
                                            className="h-20 w-20 rounded-lg object-contain border border-border"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {sections.map((section) => (
                            <Card key={section.title}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <section.icon className="h-5 w-5" />
                                        {section.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {section.fields.map((field) => (
                                        <div key={field.key}>
                                            <label className="block text-sm font-medium text-foreground">
                                                {field.label}
                                            </label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    value={data.settings.find((s) => s.key === field.key)?.value || ''}
                                                    onChange={(e) => updateSetting(field.key, e.target.value)}
                                                    rows={3}
                                                    className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    value={data.settings.find((s) => s.key === field.key)?.value || ''}
                                                    onChange={(e) => updateSetting(field.key, e.target.value)}
                                                    className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-6">
                        <FormActions processing={processing} saveLabel="Simpan Pengaturan" />
                    </div>
                </form>
            </div>
        </>
    );
}

Settings.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Pengaturan', href: '/admin/settings' },
    ],
};
