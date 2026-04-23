import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { normalizePlate, STATUS_LABELS } from "@/lib/utils"
import { ItemRow } from "./ItemRow"
import type { Item, VeiculoStatus, Vehicle } from "./types"

const STATUSES: VeiculoStatus[] = ["PENDENTE", "EM_ESPERA", "PRONTO", "ENTREGUE"]

const schema = z.object({
    placa:    z.string().min(1, "Placa obrigatória"),
    descricao: z.string().min(1, "Descrição obrigatória"),
    status:   z.enum(["PENDENTE", "EM_ESPERA", "PRONTO", "ENTREGUE"]),
})

type FormData = z.infer<typeof schema>

interface Props {
    open: boolean
    vehicle?: Vehicle
    onClose: () => void
    onSave: (data: FormData & { itens: Item[] }) => void
    onArchive?: () => void
    isSaving?: boolean
}

export function VehicleModal({ open, vehicle, onClose, onSave, onArchive, isSaving }: Props) {
    const [itens, setItems] = useState<Item[]>([])

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { status: "PENDENTE" },
    })

    useEffect(() => {
        if (open) {
            if (vehicle) {
                setItems((vehicle.itens ?? []).map((i) => ({ ...i })))
                reset({ placa: vehicle.placa, descricao: vehicle.descricao, status: vehicle.status })
            } else {
                reset({ placa: "", descricao: "", status: "PENDENTE" })
                setItems([])
            }
        }
    }, [open, vehicle, reset])

    function handleItemChange(index: number, field: "descricao" | "status" | "tipo", value: string) {
        setItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
    }

    function handleItemRemove(index: number) {
        setItems((prev) => prev.filter((_, i) => i !== index))
    }

    function handleAddItem() {
        setItems((prev) => [...prev, { descricao: "", status: "PENDENTE", tipo: "PECA" }])
    }

    function onSubmit(data: FormData) {
        onSave({ ...data, itens: itens.filter((i) => i.descricao.trim()) })
    }

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-60 flex items-end"
            style={{ background: "rgba(10, 20, 35, 0.55)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="w-full rounded-t-[20px] max-h-[88vh] overflow-y-auto"
                style={{
                    background:           "rgba(255,255,255,0.92)",
                    backdropFilter:       "blur(20px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                    boxShadow:            "var(--shadow-sheet)",
                }}
            >
                <div
                    className="w-9 h-1 rounded-full mx-auto mt-3"
                    style={{ background: "var(--border2)" }}
                />

                <div
                    className="px-4 py-3.5"
                    style={{ borderBottom: "0.5px solid var(--border)" }}
                >
                    <p className="text-[15px] font-semibold text-[var(--text)]">
                        {vehicle ? "Editar veículo" : "Novo veículo"}
                    </p>
                    {vehicle && (
                        <p className="text-[13px] font-mono mt-0.5" style={{ color: "var(--text3)" }}>
                            {vehicle.placa}
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-8">
                    <div className="mt-4 space-y-4">

                        <div className="space-y-2.5">
                            <label
                                className="text-[11px] uppercase tracking-wide block"
                                style={{ color: "var(--text2)" }}
                            >
                                Dados
                            </label>

                            <input
                                className="w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none transition-colors"
                                style={{
                                    background:  "var(--bg)",
                                    border:      `0.5px solid ${errors.placa ? "var(--color-error)" : "var(--border2)"}`,
                                    color:       "var(--text)",
                                }}
                                placeholder="Placa (ex: ABC-1234)"
                                maxLength={8}
                                {...register("placa")}
                                onChange={(e) => setValue("placa", normalizePlate(e.target.value))}
                            />
                            {errors.placa && (
                                <p className="text-xs -mt-1.5" style={{ color: "var(--color-error)" }}>
                                    {errors.placa.message}
                                </p>
                            )}

                            <input
                                className="w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none transition-colors"
                                style={{
                                    background: "var(--bg)",
                                    border:     `0.5px solid ${errors.descricao ? "var(--color-error)" : "var(--border2)"}`,
                                    color:      "var(--text)",
                                }}
                                placeholder="Descrição do veículo"
                                {...register("descricao")}
                            />
                            {errors.descricao && (
                                <p className="text-xs -mt-1.5" style={{ color: "var(--color-error)" }}>
                                    {errors.descricao.message}
                                </p>
                            )}

                            <select
                                className="w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none"
                                style={{
                                    background: "var(--bg)",
                                    border:     "0.5px solid var(--border2)",
                                    color:      "var(--text)",
                                }}
                                {...register("status")}
                            >
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label
                                className="text-[11px] uppercase tracking-wide block"
                                style={{ color: "var(--text2)" }}
                            >
                                Itens
                            </label>
                            <div className="space-y-2">
                                {itens.map((item, i) => (
                                    <ItemRow
                                        key={i}
                                        index={i}
                                        descricao={item.descricao}
                                        tipo={item.tipo}
                                        status={item.status}
                                        onChange={handleItemChange}
                                        onRemove={handleItemRemove}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="w-full py-2.5 text-sm rounded-lg transition-colors"
                                style={{
                                    border:  "0.5px dashed var(--border2)",
                                    color:   "var(--text3)",
                                    background: "transparent",
                                }}
                            >
                                + Adicionar item
                            </button>
                        </div>
                    </div>

                    <div className="mt-5 space-y-2">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full py-3 text-sm font-semibold rounded-lg disabled:opacity-50 transition-opacity"
                            style={{
                                background: "var(--color-brand-primary)",
                                color:      "#ffffff",
                                boxShadow:  "0 4px 14px rgba(230,57,70,0.3)",
                            }}
                        >
                            {isSaving ? "Salvando..." : "Salvar"}
                        </button>

                        {vehicle && onArchive && (
                            <button
                                type="button"
                                onClick={onArchive}
                                className="w-full py-3 text-sm font-medium rounded-lg transition-colors"
                                style={vehicle.archived ? {
                                    background: "var(--color-waiting-bg)",
                                    color:      "var(--color-waiting-text)",
                                    border:     "0.5px solid var(--color-waiting-border)",
                                } : {
                                    background: "var(--color-pending-bg)",
                                    color:      "var(--color-pending-text)",
                                    border:     "0.5px solid var(--color-pending-border)",
                                }}
                            >
                                {vehicle.archived ? "Desarquivar" : "Arquivar"}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-3 text-sm rounded-lg transition-colors"
                            style={{
                                background: "var(--bg)",
                                color:      "var(--text3)",
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}