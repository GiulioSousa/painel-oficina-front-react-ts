import { cn, STATUS_LABELS } from "@/lib/utils"

const FILTERS: { label: string; value: string }[] = [
    { label: "Todos", value: "TODOS" },
    ...Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label })),
]

interface Props {
    active: string
    showArchived: boolean
    onFilterChange: (filter: string) => void
    onToggleArchived: () => void
}

export function FilterBar({
    active,
    showArchived,
    onFilterChange,
    onToggleArchived,
}: Props) {
    return (
        <div className="space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => onFilterChange(f.value)}
                        className={cn(
                            "flex-shrink-0 px-3 py-1 rounded-full border text-xs",
                            active === f.value
                                ? "bg-gray-900 text-white border-gray-900"
                                : "bg-white text-gray-500 border-gray-200"
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <button
                onClick={onToggleArchived}
                className={cn(
                    "flex items-center gap-1.5 text-xs",
                    showArchived ? "text-gray-900" : "text-gray-400"
                )}
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <rect x="1" y="4" width="14" height="10" rx="1" />
                    <path d="M1 4l7-3 7 3" />
                    <path d="M6 9h4" />
                </svg>
                {showArchived ? "Ocultar arquivados" : "Exibir arquivados"}
            </button>
        </div>
    )
}