import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import logoLogin from "../assets/logo-login.png"

export function Login() {
    const { login, isLoading } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        try {
            await login(username, password)
            navigate("/", { replace: true })
        } catch {
            setError("Usuário ou senha inválidos.")
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <img
                    src={logoLogin}
                    alt="Oficina Garagem Thiago Brozonga"
                    className="w-48 mb-6 select-none mx-auto block"
                    draggable={false}
                />

                {/* Card */}
                <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div style={{ height: 3, background: "#E63946" }} />

                    <div className="px-5 py-6 space-y-4">

                        {/* Erro */}
                        {error && (
                            <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                                <p className="text-xs text-red-600">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                            {/* Username */}
                            <div className="space-y-1.5">
                                <label htmlFor="username" className="text-[11px] text-gray-500">
                                    Usuário
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    autoFocus
                                    required
                                    disabled={isLoading}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="seu.usuario"
                                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 bg-white focus:outline-none focus:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label htmlFor="password" className="text-[11px] text-gray-500">
                                    Senha
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        disabled={isLoading}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full h-10 px-3 pr-10 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 bg-white focus:outline-none focus:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                                    >
                                        {showPassword ? (
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

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading || !username || !password}
                                className="w-full h-10 bg-gray-900 text-white text-sm font-medium rounded-lg active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                        </svg>
                                        Entrando…
                                    </>
                                ) : (
                                    "Entrar"
                                )}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}