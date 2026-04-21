export type Status = "PENDENTE" | "EM_ESPERA" | "PRONTO" | "ENTREGUE"

export interface Item {
    id?: number
    descricao: string
    status: Status
}

export interface Vehicle {
    id: number
    placa: string
    descricao: string
    status: Status
    archived: boolean
    createdAt: string
    itens?: Item[]
    totalItens?: number
}

export interface VehiclePage {
    content: Vehicle[]
    totalElements: number
    totalPages: number
    number: number
}

export interface ApiError {
    status: number
    message: string
    errors: { field: string; message: string }[]
}