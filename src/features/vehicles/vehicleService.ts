import api from "@/lib/api"
import type { Vehicle, VehiclePage } from "./types"

export interface VehiclePayload {
    placa: string
    descricao: string
    status: string
    items: { descricao: string; status: string }[]
}

export const vehicleService = {
    list: async (page = 0, size = 20): Promise<VehiclePage> => {
        const { data } = await api.get("/veiculos", {
            params: { page, size },
        })
        return data
    },

    create: async (payload: VehiclePayload): Promise<Vehicle> => {
        const { data } = await api.post("/veiculos", payload)
        return data
    },

    update: async (id: number, payload: VehiclePayload): Promise<Vehicle> => {
        const { data } = await api.put(`/veiculos/${id}`, payload)
        return data
    },

    archive: async (id: number, archived: boolean): Promise<Vehicle> => {
        const { data } = await api.patch(`/veiculos/${id}`, { archived })
        return data
    },
}