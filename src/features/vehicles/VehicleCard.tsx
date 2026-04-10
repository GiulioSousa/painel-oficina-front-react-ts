import { StatusBadge } from "@/components/StatusBadge"
import { cn, formatDate, STATUS_ACCENT } from "@/lib/utils"
import type { Vehicle } from "./types"

interface Props {
    vehicle: Vehicle
    onClick: () => void
}

export function VehicleCard({ vehicle, onClick }: Props) {
    const accentColor = vehicle.archived
        ? "#9CA3AF"
        : STATUS_ACCENT[vehicle.status]

        const itemCount = vehicle.items?.length ?? 0

    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer active:opacity-80",
                vehicle.archived && "opacity-50 border-dashed"
            )}
        >
            <div style={{ height: 4, background: accentColor }} />

            <div className="px-4 pt-3 pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-mono text-sm font-medium text-gray-900">
                            {vehicle.placa}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{vehicle.descricao}</p>
                    </div>
                    <StatusBadge status={vehicle.status} archived={vehicle.archived} />
                </div>

                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">
                        {formatDate(vehicle.createdAt)}
                    </span>
                    <span className="text-[11px] text-gray-500">
                        {itemCount > 0 ? (
                            <>
                                <span className="font-medium text-gray-800">
                                    {vehicle.items.length}
                                </span>{" "}
                                {vehicle.items.length === 1 ? "item" : "itens"}
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