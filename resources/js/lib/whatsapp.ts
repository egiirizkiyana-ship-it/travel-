/**
 * Normalize an Indonesian phone number to international format.
 *
 * Examples:
 *   081234567890  → 6281234567890
 *   +6281234567890 → 6281234567890
 *   6281234567890  → 6281234567890
 */
export function normalizePhone(phone: string): string {
    let cleaned = phone.replace(/[\s\-()+\s]/g, '');

    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.slice(1);
    }

    if (cleaned.startsWith('+')) {
        cleaned = cleaned.slice(1);
    }

    if (!cleaned.startsWith('62')) {
        cleaned = '62' + cleaned;
    }

    return cleaned;
}

/**
 * Build a WhatsApp wa.me URL with optional pre-filled message.
 */
export function buildWhatsAppUrl(phone: string, message?: string): string {
    const normalized = normalizePhone(phone);
    const base = `https://wa.me/${normalized}`;

    if (message) {
        return `${base}?text=${encodeURIComponent(message)}`;
    }

    return base;
}
