import { useState } from "react"
import { 
    useVehicles, 
    useCreateVehicle, 
    useUpdateVehicle, 
    useArchiveVehicle,
    useVehicleDetail 
} from "@/features/vehicles/useVehicles"
import { VehicleCard } from "@/features/vehicles/VehicleCard"
import { VehicleModal } from "@/features/vehicles/VehicleModal"
import { MetricCard } from "@/components/MetricCard"
import { FilterBar } from "@/components/FilterBar"
import { Drawer } from "@/components/Drawer"
import { FAB } from "@/components/FAB"
import { useUiStore } from "@/store/uiStore"

export function Dashboard() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const {
        activeFilter,
        showArchived,
        editingVehicleId,
        isNewModalOpen,
        setActiveFilter,
        toggleShowArchived,
        setEditingVehicleId,
        setIsNewModalOpen,
    } = useUiStore()

    const { data, isLoading } = useVehicles()
    const createVehicle = useCreateVehicle()
    const updateVehicle = useUpdateVehicle()
    const archiveVehicle = useArchiveVehicle()
    const { data: vehicleDetail } = useVehicleDetail(editingVehicleId)

    const vehicles = data?.content ?? []

    const filtered = vehicles
        .filter((v) => (showArchived ? true : !v.archived))
        .filter((v) => activeFilter === "TODOS" ? true : v.status === activeFilter)

    const active = vehicles.filter((v) => !v.archived)
    const counts = {
        PENDENTE: active.filter((v) => v.status === "PENDENTE").length,
        EM_ESPERA: active.filter((v) => v.status === "EM_ESPERA").length,
        PRONTO: active.filter((v) => v.status === "PRONTO").length,
    }

    const editingVehicle = vehicleDetail /* ?? vehicles.find((v) => v.id === editingVehicleId) */

    function handleSave(data: any) {
        const payload = {
            placa: data.placa,
            descricao: data.descricao,
            status: data.status,
            itens: data.itens ?? []
        }
        if (editingVehicleId) {
            updateVehicle.mutate(
                { id: editingVehicleId, payload },
                { onSuccess: () => setEditingVehicleId(null) }
            )
        } else {
            createVehicle.mutate(payload, {
                onSuccess: () => setIsNewModalOpen(false),
            })
        }
    }

    function handleArchive() {
        if (!editingVehicle) return
        archiveVehicle.mutate(
            { id: editingVehicle.id, archived: !editingVehicle.archived },
            { onSuccess: () => setEditingVehicleId(null) }
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="flex flex-col gap-1 p-1"
                    aria-label="Menu"
                >
                    <span className="block w-4.5 h-px bg-gray-900 rounded" />
                    <span className="block w-4.5 h-px bg-gray-900 rounded" />
                    <span className="block w-4.5 h-px bg-gray-900 rounded" />
                </button>
                <span className="text-[15px] font-medium text-gray-900">Dashboard</span>
            </div>

            <div className="px-3.5 pt-4 pb-24 space-y-4">
                <div className="grid grid-cols-2 gap-2.5">
                    <MetricCard label="Pendente" value={counts.PENDENTE} valueClassName="text-amber-700" />
                    <MetricCard label="Em espera" value={counts.EM_ESPERA} valueClassName="text-blue-700" />
                    <div className="col-span-2 bg-gray-50 rounded-lg px-3 py-3 flex justify-between items-center">
                        <div>
                            <p className="text-[11px] text-gray-500 mb-1">Total ativos</p>
                            <p className="text-[22px] font-medium text-gray-900">{active.length}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] text-gray-500 mb-1">Pronto</p>
                            <p className="text-[22px] font-medium text-green-700">{counts.PRONTO}</p>
                        </div>
                    </div>
                </div>

                <FilterBar
                    active={activeFilter}
                    showArchived={showArchived}
                    onFilterChange={setActiveFilter}
                    onToggleArchived={toggleShowArchived}
                />

                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-sm text-gray-400 py-10">
                        Nenhum veículo encontrado.
                    </p>
                ) : (
                    <div className="space-y-2.5">
                        {filtered.map((v) => (
                            <VehicleCard
                                key={v.id}
                                vehicle={v}
                                onClick={() => setEditingVehicleId(v.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <FAB onClick={() => setIsNewModalOpen(true)} />

            <VehicleModal
                open={isNewModalOpen}
                onClose={() => setIsNewModalOpen(false)}
                onSave={handleSave}
                isSaving={createVehicle.isPending}
            />

            <VehicleModal
                open={!!editingVehicleId}
                vehicle={editingVehicle}
                onClose={() => setEditingVehicleId(null)}
                onSave={handleSave}
                onArchive={handleArchive}
                isSaving={updateVehicle.isPending}
            />
        </div>
    )
}