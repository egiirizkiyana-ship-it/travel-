import { Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { ImagePreview } from './ImagePreview';

interface ImageUploaderProps {
    value?: string;
    onChange: (value: string) => void;
    onFileSelect?: (file: File) => void;
    onRemove?: () => void;
    accept?: string;
    label?: string;
}

export function ImageUploader({
    value,
    onChange,
    onFileSelect,
    onRemove,
    accept = 'image/jpeg,image/png,image/webp',
    label = 'Upload gambar',
}: ImageUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];

        if (file && file.type.startsWith('image/')) {
            if (onFileSelect) {
                onFileSelect(file);
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    onChange(event.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (onFileSelect) {
                onFileSelect(file);
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    onChange(event.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-foreground">{label}</label>
            )}
            {value ? (
                <div className="relative inline-block">
                    <ImagePreview
                        src={value}
                        alt="Preview"
                        className="h-40 w-40 rounded-lg object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => {
 if (onRemove) {
 onRemove(); 
} else {
 onChange(''); 
} 
}}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ) : (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                        dragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/25 hover:border-primary/50'
                    }`}
                >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        Klik atau seret gambar ke sini
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        JPG, PNG, atau WebP (maks. 5MB)
                    </p>
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
}
