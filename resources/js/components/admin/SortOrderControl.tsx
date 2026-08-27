import { ChevronUp, ChevronDown } from 'lucide-react';

interface SortOrderControlProps {
    onMoveUp: () => void;
    onMoveDown: () => void;
    canMoveUp?: boolean;
    canMoveDown?: boolean;
}

export function SortOrderControl({
    onMoveUp,
    onMoveDown,
    canMoveUp = true,
    canMoveDown = true,
}: SortOrderControlProps) {
    return (
        <div className="inline-flex flex-col">
            <button
                type="button"
                onClick={onMoveUp}
                disabled={!canMoveUp}
                className="rounded p-0.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
            >
                <ChevronUp className="h-3 w-3" />
            </button>
            <button
                type="button"
                onClick={onMoveDown}
                disabled={!canMoveDown}
                className="rounded p-0.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
            >
                <ChevronDown className="h-3 w-3" />
            </button>
        </div>
    );
}
