interface StatusBadgeProps {
    active: boolean;
    activeLabel?: string;
    inactiveLabel?: string;
}

export function StatusBadge({
    active,
    activeLabel = 'Aktif',
    inactiveLabel = 'Nonaktif',
}: StatusBadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
            }`}
        >
            {active ? activeLabel : inactiveLabel}
        </span>
    );
}

interface InquiryStatusBadgeProps {
    status: string;
}

const inquiryStatusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    follow_up: 'bg-orange-100 text-orange-700',
    converted: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
};

const inquiryStatusLabels: Record<string, string> = {
    new: 'Baru',
    contacted: 'Dihubungi',
    follow_up: 'Follow Up',
    converted: 'Konversi',
    closed: 'Selesai',
};

export function InquiryStatusBadge({ status }: InquiryStatusBadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                inquiryStatusColors[status] || 'bg-gray-100 text-gray-700'
            }`}
        >
            {inquiryStatusLabels[status] || status}
        </span>
    );
}
