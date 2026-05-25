import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { VeiculoStatus } from "@/features/vehicles/types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

export function normalizePlate(value: string): string {
    return value.toUpperCase().replace(/[^A-Z0-9-]/g, "")
}

export const STATUS_LABELS: Record<VeiculoStatus, string> = {
    PENDENTE: "Pendente",
    EM_ESPERA: "Em espera",
    PRONTO: "Pronto",
    ENTREGUE: "Entregue",
}

export const STATUS_ACCENT: Record<VeiculoStatus, string> = {
    PENDENTE: "#F59E0B",
    EM_ESPERA: "#3B82F6",
    PRONTO: "#10B981",
    ENTREGUE: "#9CA3AF",
}

export const STATUS_BADGE: Record<VeiculoStatus, { bg: string; text: string; border: string }> = {
    PENDENTE: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
    EM_ESPERA: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
    PRONTO: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
    ENTREGUE: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" },
}