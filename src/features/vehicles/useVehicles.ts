import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { vehicleService, type VehiclePayload } from "./vehicleService"

const VEHICLES_KEY = ["vehicles"]

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