import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn, normalizePlate, STATUS_LABELS } from "@/lib/utils"
import { ItemRow } from "./ItemRow"
import type { Item, Status, Vehicle } from "./types"

const STATUSES: Status[] = ["PENDENTE", "EM_ESPERA", "PRONTO", "ENTREGUE"]

const schema = z.object({
    placa: z.string().min(1, "Placa obrigatória"),
    descricao: z.string().min(1, "Descrição obrigatória"),
    status: z.enum(["PENDENTE", "EM_ESPERA", "PRONTO", "ENTREGUE"]),
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

export function VehicleModal({
    open,
    vehicle,
    onClose,
    onSave,
    onArchive,
    isSaving,
}: Props) {
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
                console.log("vehicle detail:", vehicle)
                const sourceItems = vehicle.itens ?? []
                console.log("itens:", sourceItems)
                setItems(sourceItems.map((i) => ({ ...i })))
                reset({
                    placa: vehicle.placa,
                    descricao: vehicle.descricao,
                    status: vehicle.status,
                })
            } else {
                reset({ placa: "", descricao: "", status: "PENDENTE" })
                setItems([])
            }
        }
    }, [open, vehicle, reset])

    function handleItemChange(
        index: number,
        field: "descricao" | "status",
        value: string
    ) {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        )
    }

    function handleItemRemove(index: number) {
        setItems((prev) => prev.filter((_, i) => i !== index))
    }

    function handleAddItem() {
        setItems((prev) => [...prev, { descricao: "", status: "PENDENTE" }])
    }

    function onSubmit(data: FormData) {
        onSave({ ...data, itens: itens.filter((i) => i.descricao.trim()) })
    }

    if (!open) return null

    return (
        <div
            className="fixed inset-0 bg-black/40 z-60 flex items-end"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white w-full rounded-t-[20px] max-h-[88vh] overflow-y-auto">
                <div className="w-9 h-1 bg-gray-200 rounded-full mx-auto mt-2.5" />

                <div className="px-4 py-3.5 border-b border-gray-100">
                    <p className="text-[15px] font-medium text-gray-900">
                        {vehicle ? "Editar veículo" : "Novo veículo"}
                    </p>
                    {vehicle && (
                        <p className="text-[13px] text-gray-400 font-mono mt-0.5">
                            {vehicle.placa}
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-8">
                    <div className="mt-4 space-y-3">
                        <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-400 mb-2 block">
                                Dados
                            </label>
                            <input
                                className={cn(
                                    "w-full px-3 py-2.5 text-sm border rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-400 mb-2.5",
                                    errors.placa ? "border-red-400" : "border-gray-200"
                                )}
                                placeholder="Placa (ex: ABC-1234)"
                                maxLength={8}
                                {...register("placa")}
                                onChange={(e) =>
                                    setValue("placa", normalizePlate(e.target.value))
                                }
                            />
                            {errors.placa && (
                                <p className="text-xs text-red-500 -mt-2 mb-2">
                                    {errors.placa.message}
                                </p>
                            )}

                            <input
                                className={cn(
                                    "w-full px-3 py-2.5 text-sm border rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-400 mb-2.5",
                                    errors.descricao ? "border-red-400" : "border-gray-200"
                                )}
                                placeholder="Descrição do veículo"
                                {...register("descricao")}
                            />
                            {errors.descricao && (
                                <p className="text-xs text-red-500 -mt-2 mb-2">
                                    {errors.descricao.message}
                                </p>
                            )}

                            <select
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-400"
                                {...register("status")}
                            >
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>
                                        {STATUS_LABELS[s]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-400 mb-2 block">
                                Itens
                            </label>
                            <div className="space-y-2 mb-2">
                                {itens.map((item, i) => (
                                    <ItemRow
                                        key={i}
                                        index={i}
                                        descricao={item.descricao}
                                        status={item.status}
                                        onChange={handleItemChange}
                                        onRemove={handleItemRemove}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="w-full py-2.5 text-sm border border-dashed border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50"
                            >
                                + Adicionar item
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 space-y-2">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-lg disabled:opacity-50"
                        >
                            {isSaving ? "Salvando..." : "Salvar"}
                        </button>

                        {vehicle && onArchive && (
                            <button
                                type="button"
                                onClick={onArchive}
                                className={cn(
                                    "w-full py-3 text-sm font-medium rounded-lg border",
                                    vehicle.archived
                                        ? "bg-blue-50 text-blue-800 border-blue-200"
                                        : "bg-amber-50 text-amber-800 border-amber-200"
                                )}
                            >
                                {vehicle.archived ? "Desarquivar" : "Arquivar"}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-3 bg-gray-50 text-gray-500 text-sm rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}