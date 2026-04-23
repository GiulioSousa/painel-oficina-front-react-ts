import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useUiStore } from "@/store/uiStore"
import App from "./App"
import "./index.css"

const queryClient = new QueryClient()

function Root() {
    const theme = useUiStore((s) => s.theme)

    useEffect(() => {
        const root = document.documentElement
        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }, [theme])

    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Root />
    </StrictMode>
)