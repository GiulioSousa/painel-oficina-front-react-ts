import api from "@/lib/api"
import type { Item, Vehicle, VehiclePage } from "./types"

export interface VehiclePayload {
    placa: string
    descricao: string
    status: string
    itens: { descricao: string; status: string }[]
}

export interface ItemPayload {
    descricao: string
    tipo: string
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
        const { data } = await api.patch(`/veiculos/${id}/arquivar`, { archived })
        return data
    },

    detail: async (id: number): Promise<Vehicle> => {
        const { data } = await api.get(`/veiculos/${id}/detalhe`)
        return data
    },

    addItem: async (veiculoId: number, payload: ItemPayload): Promise<Item> => {
        const { data } = await api.post(`/itens/veiculo/${veiculoId}`, payload)
        return data
    },

    updateItem: async (id: number, payload: ItemPayload): Promise<Item> => {
        const { data } = await api.patch(`/itens/${id}`, payload)
        return data
    },

    updateItemStatus: async (id: number, status: string): Promise<Item> => {
        const { data } = await api.patch(`/itens/${id}/status`, null, {
            params: { status },
        })
        return data
    },

    deleteItem: async (id: number): Promise<void> => {
        await api.delete(`/itens/${id}`)
    },
}