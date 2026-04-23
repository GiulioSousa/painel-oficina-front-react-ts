import { cn, STATUS_BADGE, STATUS_LABELS } from "@/lib/utils"
import type { VeiculoStatus as Status } from "@/features/vehicles/types"

interface Props {
    status: Status
    archived?: boolean
}

export function StatusBadge({ status, archived }: Props) {
    if (archived) {
        return (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-archived-bg text-archived-text border-archived-border">
                Arquivado
            </span>
        )
    }

    const { bg, text, border } = STATUS_BADGE[status]

    return (
        <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", bg, text, border)}>
            {STATUS_LABELS[status]}
        </span>
    )
}