import React from "react"
import ReactDom from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./app/queryClient"
import App from "./App.tsx"
import "./index.css"

ReactDom.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)