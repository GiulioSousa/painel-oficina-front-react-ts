import type { ItemStatus, ItemTipo } from "./types"

const ITEM_STATUSES: ItemStatus[] = ["PENDENTE", "PRONTO"]
const ITEM_TIPOS: { value: ItemTipo; label: string }[] = [
    { value: "PECA", label: "Peça" },
    { value: "SERVICO", label: "Serviço" },
]

const ITEM_STATUS_LABELS: Record<ItemStatus, string> = {
    PENDENTE: "Pendente",
    PRONTO: "Pronto",
}

interface Props {
    index: number
    descricao: string
    status: ItemStatus
    tipo: ItemTipo
    onChange: (index: number, field: "descricao" | "status" | "tipo", value: string) => void
    onRemove: (index: number) => void
}

export function ItemRow({ index, descricao, status, tipo, onChange, onRemove }: Props) {
    return (
        <div className="flex flex-col gap-2 p-3 border border-gray-100 rounded-lg bg-gray-50">
            <input
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-400"
                placeholder="Descrição do item"
                value={descricao}
                onChange={(e) => onChange(index, "descricao", e.target.value)}
            />
            <div className="flex gap-2">
                <select
                    className="flex-1 px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-400"
                    value={tipo}
                    onChange={(e) => onChange(index, "tipo", e.target.value)}
                >
                    {ITEM_TIPOS.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </select>
                <select
                    className="flex-1 px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-400"
                    value={status}
                    onChange={(e) => onChange(index, "status", e.target.value)}
                >
                    {ITEM_STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {ITEM_STATUS_LABELS[s]}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => onRemove(index)}
                    className="text-gray-400 hover:text-gray-600 px-2 text-base"
                    aria-label="Remover item"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}