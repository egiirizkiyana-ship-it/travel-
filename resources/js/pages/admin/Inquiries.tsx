import { Head } from '@inertiajs/react';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Inquiry } from '@/types';

interface InquiriesProps {
    inquiries: Inquiry[];
}

const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    follow_up: 'bg-orange-100 text-orange-700',
    converted: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
};

export default function Inquiries({ inquiries }: InquiriesProps) {
    return (
        <>
            <Head title="Inquiries" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Inquiries</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage customer inquiries
                    </p>
                </div>

                {inquiries.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                <MessageSquare className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">
                                No inquiries yet
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {inquiries.map((inquiry) => (
                            <Card key={inquiry.id}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-base">{inquiry.name}</CardTitle>
                                    <Badge className={statusColors[inquiry.status] || 'bg-gray-100 text-gray-700'}>
                                        {inquiry.status.replace('_', ' ')}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-1 text-sm text-muted-foreground">
                                        <p>Phone: {inquiry.phone}</p>
                                        {inquiry.email && <p>Email: {inquiry.email}</p>}
                                        {inquiry.package && <p>Package: {inquiry.package.name}</p>}
                                        {inquiry.message && <p>Message: {inquiry.message}</p>}
                                        <p className="text-xs">{new Date(inquiry.created_at).toLocaleDateString('id-ID')}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

Inquiries.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Inquiries', href: '/admin/inquiries' },
    ],
};
