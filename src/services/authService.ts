import api from "@/lib/api"

export const authService = {
    login: async (
        username:string,
        password:string 
    )
    :Promise<void> => {
        const params = new URLSearchParams()
        params.append("username", username)
        params.append("password", password)

        await api.post("/auth/login", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
    },

    logout: async ():Promise<void> => {
        await api.post("/auth/logout")
    },
}