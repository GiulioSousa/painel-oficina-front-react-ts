import { create } from "zustand"

interface UiStore {
    activeFilter: string
    showArchived: boolean
    editingVehicleId: number | null
    isNewModalOpen: boolean

    setActiveFilter: (filter: string) => void
    toggleShowArchived: () => void
    setEditingVehicleId: (id: number | null) => void
    setIsNewModalOpen: (open: boolean) => void
}

export const useUiStore = create<UiStore>((set) => ({
    activeFilter: "TODOS",
    showArchived: false,
    editingVehicleId: null,
    isNewModalOpen: false,

    setActiveFilter: (filter) => set({ activeFilter: filter }),
    toggleShowArchived: () =>
        set((state) => ({ showArchived: !state.showArchived })),
    setEditingVehicleId: (id) => set({ editingVehicleId: id }),
    setIsNewModalOpen: (open) => set({ isNewModalOpen: open }),
}))