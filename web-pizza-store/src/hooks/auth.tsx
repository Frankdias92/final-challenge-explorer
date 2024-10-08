'use client'

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface SignInProps {
    email: string
    password: string
}
export interface User {
    id: number
    name: string
    email: string
    password: string
    role: string
}

interface AuthContextProps {
    user: User | null
    signIn: (SignInProps: SignInProps) => void
    signOut: () => void
    handleMenuOpen: (menuStats: boolean) => void
    isMenuOpen: boolean
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    signIn: () => {},
    signOut: () => {},
    handleMenuOpen: () => {},
    isMenuOpen: false,
})

function AuthProvider({ children }:any) {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [data, setData] = useState<{
        user: User | null
    }>({ user: null })
    const router = useRouter()
    
    const handleMenuOpen = useCallback((menuStats: boolean) => {
        setMenuOpen(menuStats)
    }, [])

    const signIn = useCallback(async ({ email, password }: SignInProps) => {
        try {
            const response = await api.post('/sessions', 
                { email, password },
                { withCredentials: true }
            )
            console.log('print user id', response.data)
            const { user  } = response.data
    
            if (user) {
                localStorage.setItem("@estock:user", JSON.stringify(user))
                setData({  user }) 
                router.push('/')
            } else {
                console.log("something wrong with your informations.")
            }
        } catch (error: any) {
            console.log(error)
        }
    }, [router])

    const signOut = useCallback(() => {
        localStorage.removeItem("@estock:user")
        setData({user: null})
        router.push('/login')
    }, [router])
    
    useEffect(() => {
       const user = localStorage.getItem("@estock:user")

       if (user) {
            setData({ user: JSON.parse(user)})
       } 
    }, [router])

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
                signOut,
                handleMenuOpen,
                isMenuOpen,
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