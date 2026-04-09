import { cn } from "@/lib/utils"

interface Props {
    open: boolean
    onClose: () => void
}

export function Drawer({ open, onClose }: Props) {
    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 bg-black/35 z-50 transition-opacity",
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <div
                className={cn(
                    "fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-100 z-51 transition-transform duration-200 flex flex-col pt-6",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="px-5 pb-5 border-b border-gray-100 mb-3">
                    <p className="text-[15px] font-medium text-gray-900">Oficina</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">sistema de gestão</p>
                </div>

                <nav className="flex flex-col">
                    <button className="flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium text-gray-900 bg-gray-50">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="1" y="1" width="6" height="6" rx="1" />
                            <rect x="9" y="1" width="6" height="6" rx="1" />
                            <rect x="1" y="9" width="6" height="6" rx="1" />
                            <rect x="9" y="9" width="6" height="6" rx="1" />
                        </svg>
                        Dashboard
                    </button>

                    <button className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="1" y="3" width="14" height="11" rx="1" />
                            <path d="M5 3V2M11 3V2" />
                        </svg>
                        Veículos
                    </button>

                    <button className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="8" cy="8" r="6" />
                            <path d="M8 5v3l2 2" />
                        </svg>
                        Manutenções
                    </button>
                </nav>
            </div>
        </>
    )
}