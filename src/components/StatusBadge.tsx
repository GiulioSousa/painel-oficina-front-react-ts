import { cn, STATUS_BADGE, STATUS_LABELS } from "@/lib/utils"
import type { VeiculoStatus } from "@/features/vehicles/types"

interface Props {
    status: VeiculoStatus
    archived?: boolean
}

export function StatusBadge({ status, archived }: Props) {
    if (archived) {
        return (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                Arquivado
            </span>
        )
    }

    const { bg, text } = STATUS_BADGE[status]

    return (
        <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", bg, text)}>
            {STATUS_LABELS[status]}
        </span>
    )
}