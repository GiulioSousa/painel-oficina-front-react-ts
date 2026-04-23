import { StatusBadge } from "@/components/StatusBadge"
import { cn, formatDate, STATUS_ACCENT } from "@/lib/utils"
import type { Vehicle } from "./types"

interface Props {
    vehicle: Vehicle
    onClick: () => void
}

export function VehicleCard({ vehicle, onClick }: Props) {
    const accentColor = vehicle.archived
        ? "var(--color-archived-accent)"
        : STATUS_ACCENT[vehicle.status]

        const itemCount = vehicle.totalItens ?? vehicle.itens?.length ?? 0

    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-[var(--bg2)] rounded-xl overflow-hidden cursor-pointer",
                "transition-all duration-200",
                "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-px",
                "active:scale-[0.99] active:opacity-90",
                "shadow-[var(--shadow-card)]",
                vehicle.archived && "opacity-50 border border-dashed border-[var(--border)]"
            )}
        >
            <div style={{ height: 3, background: accentColor }} />

            <div className="px-4 pt-3 pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-mono text-sm font-medium text-[var(--text)]">
                            {vehicle.placa}
                        </p>
                        <p className="text-xs text-[var(--text2)] mt-0.5">{vehicle.descricao}</p>
                    </div>
                    <StatusBadge status={vehicle.status} archived={vehicle.archived} />
                </div>

                <div className="flex justify-between items-center mt-3 pt-2 border-t border-[var(--border)]">
                    <span className="text-[11px] text-[var(--text3)]">
                        {formatDate(vehicle.createdAt)}
                    </span>
                    <span className="text-[11px] text-[var(--text3)]">
                        {itemCount > 0 ? (
                            <>
                                <span className="font-medium text-[var(--text)]">
                                    {itemCount}
                                </span>{" "}
                                {itemCount === 1 ? "item" : "itens"}
                            </>
                        ) : (
                            "sem itens"
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}