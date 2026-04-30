import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react"
import { authService } from "@/services/authService"
interface AuthContextValue {
    isAuthenticated: boolean
    isLoading: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authService.me()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setIsLoading(false))
    }, [])

    const login = useCallback(async (username: string, password: string) => {
        setIsLoading(true)
        try {
            await authService.login(username, password)
            setIsAuthenticated(true)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const logout = useCallback(async () => {
        await authService.logout()
        setIsAuthenticated(false)
    }, [])

    if (isLoading) return null

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}