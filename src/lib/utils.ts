import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { VeiculoStatus as Status } from "@/features/vehicles/types"

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

export const STATUS_LABELS: Record<Status, string> = {
    PENDENTE: "Pendente",
    EM_ESPERA: "Em espera",
    PRONTO: "Pronto",
    ENTREGUE: "Entregue",
}

export const STATUS_ACCENT: Record<Status, string> = {
    PENDENTE: "var(--color-pending-accent)",
    EM_ESPERA: "var(--color-waiting-accent)",
    PRONTO: "var(--color-ready-accent)",
    ENTREGUE: "var(--color-delivered-accent)",
}

export const STATUS_BADGE: Record<Status, { bg: string; text: string; border: string }> = {
    PENDENTE: { 
        bg: "bg-pending-bg", 
        text: "text-pending-text",
        border: "border-pending-border"
    },
    EM_ESPERA: { 
        bg: "bg-waiting-bg", 
        text: "text-waiting-text", 
        border: "border-waiting-border"
    },
    PRONTO: { 
        bg: "bg-ready-bg", 
        text: "text-ready-text", 
        border: "border-ready-border"
    },
    ENTREGUE: { 
        bg:     "bg-delivered-bg",
        text:   "text-delivered-text",
        border: "border-delivered-border",
    },
}