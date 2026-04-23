import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { vehicleService, type VehiclePayload, type ItemPayload } from "./vehicleService"

const VEHICLES_KEY = ["vehicles"]
const VEHICLE_DETAIL_KEY = (id: number) => ["vehicle", id]

export function useVehicles() {
    return useQuery({
        queryKey: VEHICLES_KEY,
        queryFn: () => vehicleService.list(),
    })
}

export function useCreateVehicle() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: VehiclePayload) => vehicleService.create(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: VEHICLES_KEY }),
    })
}

export function useUpdateVehicle() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: VehiclePayload }) =>
            vehicleService.update(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: VEHICLES_KEY }),
    })
}

export function useArchiveVehicle() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, archived }: { id: number; archived: boolean }) =>
            vehicleService.archive(id, archived),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: VEHICLES_KEY }),
    })
}

export function useVehicleDetail(id: number | null) {
    return useQuery({
        queryKey: ["vehicle", id],
        queryFn: () => vehicleService.detail(id!),
        enabled: !!id,
    })
}

export function useAddItem() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ veiculoId, payload }: { veiculoId: number; payload: ItemPayload }) =>
            vehicleService.addItem(veiculoId, payload),
        onSuccess: (_, { veiculoId }) => {
            queryClient.invalidateQueries({ queryKey: VEHICLES_KEY })
            queryClient.invalidateQueries({ queryKey: VEHICLE_DETAIL_KEY(veiculoId) })
        },
    })
}

export function useUpdateItem() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: ItemPayload }) =>
            vehicleService.updateItem(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: VEHICLES_KEY }),
    })
}

export function useUpdateItemStatus() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) =>
            vehicleService.updateItemStatus(id, status),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: VEHICLES_KEY }),
    })
}

export function useDeleteItem() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => vehicleService.deleteItem(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: VEHICLES_KEY }),
    })
}