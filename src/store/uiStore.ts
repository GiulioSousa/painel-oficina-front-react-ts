import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UiStore {
    activeFilter: string
    showArchived: boolean
    editingVehicleId: number | null
    isNewModalOpen: boolean
    theme: "light" | "dark"

    setActiveFilter: (filter: string) => void
    toggleShowArchived: () => void
    setEditingVehicleId: (id: number | null) => void
    setIsNewModalOpen: (open: boolean) => void
    toggleTheme: () => void
}

export const useUiStore = create<UiStore>()(
    persist(
        (set) => ({
            activeFilter:      "TODOS",
            showArchived:      false,
            editingVehicleId:  null,
            isNewModalOpen:    false,
            theme:             "light",

            setActiveFilter:      (filter) => set({ activeFilter: filter }),
            toggleShowArchived:   () => set((state) => ({ showArchived: !state.showArchived })),
            setEditingVehicleId:  (id) => set({ editingVehicleId: id }),
            setIsNewModalOpen:    (open) => set({ isNewModalOpen: open }),
            toggleTheme:          () => set((state) => ({
                theme: state.theme === "light" ? "dark" : "light",
            })),
        }),
        {
            name:    "oficina-ui",
            partialize: (state) => ({ theme: state.theme }),
        }
    )
)