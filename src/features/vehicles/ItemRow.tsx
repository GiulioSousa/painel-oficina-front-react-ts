import { STATUS_LABELS } from "@/lib/utils"
import type { Status } from "./types"

const STATUSES: Status[] = ["PENDENTE", "EM_ESPERA", "PRONTO", "ENTREGUE"]

interface Props {
    index: number
    descricao: string
    status: Status
    onChange: (index: number, field: "descricao" | "status", value: string) => void
    onRemove: (index: number) => void
}

export function ItemRow({ index, descricao, status, onChange, onRemove }: Props) {
    return (
        <div className="flex gap-2 items-center">
            <input
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-400"
                placeholder="Descrição do item"
                value={descricao}
                onChange={(e) => onChange(index, "descricao", e.target.value)}
            />
            <select
                className="w-32 px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-400"
                value={status}
                onChange={(e) => onChange(index, "status", e.target.value)}
            >
                {STATUSES.map((s) => (
                    <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                    </option>
                ))}
            </select>
            <button
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-gray-600 px-1 text-base"
                aria-label="Remover item"
            >
                ✕
            </button>
        </div>
    )
}