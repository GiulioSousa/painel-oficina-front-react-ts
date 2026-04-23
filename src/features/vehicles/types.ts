export type VeiculoStatus = "PENDENTE" | "EM_ESPERA" | "PRONTO" | "ENTREGUE"
export type ItemTipo = "PECA" | "SERVICO"
export type ItemStatus = "PENDENTE" | "PRONTO"

export interface Item {
    id?: number
    descricao: string
    tipo: ItemTipo
    status: ItemStatus
}

export interface Vehicle {
    id: number
    placa: string
    descricao: string
    status: VeiculoStatus
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