'use client'

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface SingInProps {
    email: string
    password: string
}
interface User {
    id: number
    name: string
    email: string
    password: string
    role: string
}



interface AuthContextProps {
    user: User | null
    singIn: (SingInProps: SingInProps) => void
    signOut: () => void
    handleMenuOpen: (menuStats: boolean) => void
    isMenuOpen: boolean
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    singIn: () => {},
    signOut: () => {},
    handleMenuOpen: () => {},
    isMenuOpen: false
})

function AuthProvider({ children }:any) {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [data, setData] = useState<{
        user: User | null
    }>({ user: null })
    
    const router = useRouter()

    function handleMenuOpen(menuStats: boolean) {
        setMenuOpen(menuStats)
    }

    async function singIn({ email, password }: SingInProps) {
        try {
            const response = await api.post('/sessions', 
                { email, password },
                { withCredentials: true }
            )
            const { user  } = response.data

            if (user) {
                localStorage.setItem("@estock:user", JSON.stringify(user))
                setData({  user }) 
                router.push('/home')
            } else {
                console.log("something wrong with your informations.")
            }
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    function signOut() {
        localStorage.removeItem("@estock:user")
        setData({user: null})
        router.push('/login')
    }
    
    useEffect(() => {
       const user = localStorage.getItem("@estock:user")

       if (user) {
        setData({ user: JSON.parse(user)})
       } else {
        setData({ user: null})
       }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                singIn,
                signOut,
                handleMenuOpen,
                isMenuOpen
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