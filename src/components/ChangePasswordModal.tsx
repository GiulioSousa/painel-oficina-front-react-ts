import { useState } from "react"
import { authService } from "@/services/authService"

interface Props {
    open: boolean
    onClose: () => void
}

export function ChangePasswordModal({ open, onClose }: Props) {

    const [senhaAtual, setSenhaAtual] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [confirmar, setConfirmar] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showFields, setShowFields] = useState({
        senhaAtual: false,
        novaSenha: false,
        confirmar: false
    })

    function reset() {
        setSenhaAtual("")
        setNovaSenha("")
        setConfirmar("")
        setError(null)
        setSuccess(false)
    }

    function handleClose() {
        reset()
        onClose()
    }

    function toggleShow(field: keyof typeof showFields) {
        setShowFields(prev => ({ ...prev, [field]: !prev[field] }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (novaSenha.length < 6) {
            setError("A nova senha deve ter no mínimo 6 caracteres.")
            return
        }
        if (novaSenha !== confirmar) {
            setError("As senhas não coincidem.")
            return
        }

        setLoading(true)
        try {
            await authService.changePassword(senhaAtual, novaSenha)
            setSuccess(true)
        } catch (err: any) {
            setError(err?.response?.data?.message ?? "Erro ao alterar senha.")
        } finally {
            setLoading(false)
        }
    }

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-60 flex items-end"
            style={{ background: "rgba(10, 20, 35, 0.55)" }}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div
                className="w-full rounded-t-[20px]"
                style={{
                    background: "var(--bg)",
                    boxShadow: "var(--shadow-sheet)",
                }}
            >
                <div className="w-9 h-1 rounded-full mx-auto mt-3" style={{ background: "var(--border2)" }} />

                <div className="px-4 py-3.5" style={{ borderBottom: "0.5px solid var(--border)" }}>
                    <p className="text-[15px] font-semibold text-[var(--text)]">Alterar senha</p>
                </div>

                <div className="px-4 pb-8 pt-4">
                    {success ? (
                        <div className="space-y-4">
                            <p className="text-sm text-[var(--color-ready-text)]">Senha alterada com sucesso.</p>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 text-sm rounded-lg"
                                style={{ background: "var(--bg2)", color: "var(--text3)" }}
                            >
                                Fechar
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {error && (
                                <div className="rounded-lg px-3 py-2.5" style={{ background: "rgba(230,57,70,0.08)", border: "0.5px solid var(--color-error-border)" }}>
                                    <p className="text-xs" style={{ color: "var(--color-error)" }}>{error}</p>
                                </div>
                            )}

                            {(["senhaAtual", "novaSenha", "confirmar"] as const).map((field) => {
                                const labels = { senhaAtual: "Senha atual", novaSenha: "Nova senha", confirmar: "Confirmar nova senha" }
                                const values = { senhaAtual, novaSenha, confirmar }
                                const setters = { senhaAtual: setSenhaAtual, novaSenha: setNovaSenha, confirmar: setConfirmar }
                                return (
                                    <div key={field} className="space-y-1.5">
                                        <label className="text-[11px]" style={{ color: "var(--text2)" }}>{labels[field]}</label>
                                        <div className="relative">
                                            <input
                                                type={showFields[field] ? "text" : "password"}
                                                required
                                                disabled={loading}
                                                value={values[field]}
                                                onChange={(e) => setters[field](e.target.value)}
                                                className="w-full px-3 py-2.5 pr-10 text-sm rounded-lg focus:outline-none"
                                                style={{ background: "var(--bg2)", border: "0.5px solid var(--border2)", color: "var(--text)" }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => toggleShow(field)}
                                                tabIndex={-1}
                                                className="absolute right-3 top-0 bottom-0 flex items-center"
                                                style={{ color: "var(--text3)" }}
                                            >
                                                {showFields[field] ? (
                                                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                                        <path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5Z" stroke="currentColor" strokeWidth="1.5" />
                                                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                        <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                ) : (
                                                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                                        <path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5Z" stroke="currentColor" strokeWidth="1.5" />
                                                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="pt-2 space-y-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 text-sm font-semibold rounded-lg disabled:opacity-50"
                                    style={{ background: "var(--color-brand-primary)", color: "#fff" }}
                                >
                                    {loading ? "Salvando..." : "Salvar"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="w-full py-3 text-sm rounded-lg"
                                    style={{ background: "var(--bg2)", color: "var(--text3)" }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}