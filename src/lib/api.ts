import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ?? "Erro inesperado. Tente novamente."
        return Promise.reject({ ...error, userMessage: message })
    }
)

export default api