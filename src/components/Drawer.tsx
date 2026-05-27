import { cn } from "@/lib/utils"
import { useUiStore } from "@/store/uiStore"
import { useAuth } from "@/contexts/AuthContext"
import logoDrawer from "@/assets/logo-drawer.png"
import { useNavigate } from "react-router-dom"

interface Props {
    open: boolean
    onClose: () => void
    onChangePassword: () => void
}

export function Drawer({ open, onClose, onChangePassword }: Props) {
    const { theme, toggleTheme } = useUiStore()
    const { logout } = useAuth()
    const navigate = useNavigate()
    const isDark = theme === "dark"

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 z-50 transition-opacity",
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                style={{ background: "rgba(10, 10, 10, 0.55)" }}
                onClick={onClose}
            />

            <div
                className={cn(
                    "fixed top-0 left-0 h-full w-60 z-51 transition-transform duration-200 flex flex-col pt-6",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
                style={{
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(20px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                    borderRight: "0.5px solid var(--glass-border)",
                    boxShadow: "var(--shadow-lg)",
                }}
            >
                <div
                    className="px-5 pb-5 mb-3 flex items-center justify-center"
                    style={{ borderBottom: "0.5px solid var(--border)" }}
                >
                    <img
                        src={logoDrawer}
                        alt="Oficina Garagem"
                        className="w-24 mx-auto block select-none"
                        draggable={false}
                    />
                </div>

                <nav className="flex flex-col flex-1">
                    <button
                        className="flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium transition-colors"
                        style={{
                            color: "var(--color-brand-secondary)",
                            background: "rgba(69, 123, 157, 0.08)",
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="1" y="1" width="6" height="6" rx="1" />
                            <rect x="9" y="1" width="6" height="6" rx="1" />
                            <rect x="1" y="9" width="6" height="6" rx="1" />
                            <rect x="9" y="9" width="6" height="6" rx="1" />
                        </svg>
                        Dashboard
                    </button>

                    <button
                        onClick={() => { onClose(); onChangePassword() }}
                        className="flex items-center gap-2.5 px-5 py-2.5 text-sm transition-colors"
                        style={{ color: "var(--text2)" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="7" width="10" height="7" rx="1" />
                            <path d="M5 7V5a3 3 0 0 1 6 0v2" strokeLinecap="round" />
                        </svg>
                        Alterar senha
                    </button>

                    <div className="mt-auto px-5 py-4 space-y-3" style={{ borderTop: "0.5px solid var(--border)" }}>
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2.5 w-full text-sm transition-colors"
                            style={{ color: "var(--text2)" }}
                        >
                            {isDark ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="8" cy="8" r="3" />
                                        <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" strokeLinecap="round" />
                                    </svg>
                                    Modo claro
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Modo escuro
                                </>
                            )}
                        </button>

                        <button
                            onClick={async () => {
                                await logout()
                                navigate("/login", { replace: true })
                            }}
                            className="flex items-center gap-2.5 w-full text-sm transition-colors cursor-pointer"
                            style={{ color: "var(--color-error)" }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" strokeLinecap="round" />
                                <path d="M11 11l3-3-3-3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 8H6" strokeLinecap="round" />
                            </svg>
                            Sair
                        </button>
                    </div>
                </nav>
            </div>
        </>
    )
}