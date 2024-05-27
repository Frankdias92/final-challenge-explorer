'use client'

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface SingInProps {
    email: string
    password: string
}
interface User {
    email: string
    password: string
    role: string
}



interface AuthContextProps {
    user: User | null
    singIn: (SingInProps: SingInProps) => void
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    singIn: () => {}
})

function AuthProvider({ children }:any) {
    const [data, setData] = useState<{
        user: User | null
        // token: string | null
    }>({ user: null })
    
    const router = useRouter()


    async function singIn({ email, password }: SingInProps) {
        try {
            const response = await api.post('/sessions', 
                { email, password },
                { withCredentials: true }
            )
            const { user  } = response.data

            localStorage.setItem("@estock:user", JSON.stringify(user))
            
            setData({  user }) 
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
       
    })

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                singIn
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


function UseAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, UseAuth }