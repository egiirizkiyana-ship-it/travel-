import { Save, X } from 'lucide-react';

interface FormActionsProps {
    processing?: boolean;
    onCancel?: () => void;
    saveLabel?: string;
}

export function FormActions({ processing, onCancel, saveLabel = 'Simpan' }: FormActionsProps) {
    return (
        <div className="flex items-center gap-3">
            <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
                <Save className="h-4 w-4" />
                {processing ? 'Menyimpan...' : saveLabel}
            </button>
            {onCancel && (
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
                >
                    <X className="h-4 w-4" />
                    Batal
                </button>
            )}
        </div>
    );
}
