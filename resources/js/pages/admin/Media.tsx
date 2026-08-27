import { Head } from '@inertiajs/react';
import { Image, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Media() {
    return (
        <>
            <Head title="Media Library" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your media files
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        <Upload className="h-4 w-4" />
                        Upload
                    </button>
                </div>

                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                            No media files uploaded yet
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Upload functionality will be available in Module 02
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Media.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Media', href: '/admin/media' },
    ],
};
