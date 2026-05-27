import { useQueryClient } from "@tanstack/react-query"
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
import { vehicleService } from "@/features/vehicles/vehicleService"
import { ChangePasswordModal } from "@/components/ChangePasswordModal"

export function Dashboard() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)

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

    const queryClient = useQueryClient()
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
        TOTAL_ATIVOS: 
            active.filter((v) => v.status ==="PENDENTE").length +
            active.filter((v) => v.status ==="EM_ESPERA").length +
            active.filter((v) => v.status ==="PRONTO").length 
    }

    const isFilterActive = activeFilter !== "TODOS" || showArchived
    const editingVehicle = vehicleDetail /* ?? vehicles.find((v) => v.id === editingVehicleId) */

    function handleSave(data: any) {
        const payload = {
            placa: data.placa,
            descricao: data.descricao,
            status: data.status,
            itens: data.itens ?? []
        }
        if (editingVehicleId) {
            const originalItems = vehicleDetail?.itens ?? []
            const newItems = data.itens ?? []

            const toCreate = newItems.filter((i: any) => !i.id)
            const toUpdate = newItems.filter((i: any) => i.id)
            const toDelete = originalItems.filter(
                (o) => !newItems.find((n: any) => n.id === o.id)
            )

            updateVehicle.mutate(
                { id: editingVehicleId, payload },
                {
                    onSuccess: async () => {
                        await Promise.all([
                            ...toCreate.map((i: any) =>
                                vehicleService.addItem(editingVehicleId, {
                                    descricao: i.descricao,
                                    tipo: i.tipo
                                })
                            ),
                            ...toUpdate.map(async (i: any) => {
                                await vehicleService.updateItem(i.id, {
                                    descricao: i.descricao,
                                    tipo: i.tipo,
                                })
                                const original = originalItems.find((o) => o.id === i.id)
                                if (original && original.status !== i.status) {
                                    await vehicleService.updateItemStatus(i.id, i.status)
                                }
                            }),
                            ...toDelete.map((i) => vehicleService.deleteItem(i.id!)),
                        ])
                        queryClient.invalidateQueries({ queryKey: ["vehicles"] })
                        queryClient.invalidateQueries({ queryKey: ["vehicle", editingVehicleId] })
                        setEditingVehicleId(null)
                    },
                }
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
        <div className="min-h-screen" style={{ background: "var(--bg)" }}>
            <Drawer 
                open={drawerOpen} 
                onClose={() => setDrawerOpen(false)}
                onChangePassword={() => setChangePasswordOpen(true)}
            />
            <ChangePasswordModal 
                open={changePasswordOpen} 
                onClose={() => setChangePasswordOpen(false)} />

            <div
                className="px-4 py-3 flex items-center gap-3"
                style={{
                    background: "var(--color-brand-base)",
                    boxShadow: "var(--shadow-topbar)"
                }}>
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="flex flex-col gap-1 p-1"
                    aria-label="Menu"
                >
                    <span className="block w-4.5 h-px rounded" style={{ background: "var(--color-brand-light)" }} />
                    <span className="block w-4.5 h-px rounded" style={{ background: "var(--color-brand-light)" }} />
                    <span className="block w-4.5 h-px rounded" style={{ background: "var(--color-brand-light)" }} />
                </button>
                <span
                    className="text-[15px] font-medium flex-1"
                    style={{ color: "var(--color-brand-light)" }}
                >
                    Dashboard
                </span>
            </div>

            <div className="px-3.5 pt-4 pb-24 space-y-4">
                <div className="grid grid-cols-2 gap-2.5">
                    <MetricCard label="Pendente" value={counts.PENDENTE} status="pending" />
                    <MetricCard label="Em espera" value={counts.EM_ESPERA} status="waiting" />
                    <MetricCard label="Pronto" value={counts.PRONTO} status="ready" />
                    <MetricCard label="Total ativos" value={counts.TOTAL_ATIVOS} status="totalActive" />
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
                            <div
                                key={i}
                                className="h-24 rounded-xl animate-pulse"
                                style={{ background: "var(--bg2)", opacity: 0.6 }}
                            />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <svg
                            width="40" height="40" viewBox="0 0 40 40"
                            fill="none" stroke="var(--border2)" strokeWidth="1.5"
                        >
                            <rect x="6" y="12" width="28" height="22" rx="3" />
                            <path d="M6 12l14-6 14 6" />
                            <path d="M15 22h10" />
                        </svg>
                        <p className="text-sm font-medium text-[var(--text2)]">
                            {isFilterActive
                                ? "Nenhum veículo neste filtro"
                                : "Nenhum veículo cadastrado"}
                        </p>
                        <p className="text-xs text-[var(--text3)] text-center max-w-[200px]">
                            {isFilterActive
                                ? "Tente outro filtro ou limpe a seleção atual"
                                : "Toque no botão + para cadastrar o primeiro veículo"}
                        </p>
                    </div>
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