import { createContext, useContext, useState } from "react";


interface User {
    name: string
    email: string
    password: string
    role: string
}

interface AuthContextProps {
    user: User | null
}



const AuthContext = createContext<AuthContextProps>({
    user: null
})

function AuthProvider({ children }:any) {
    const [data, setData] = useState<{
        user: User | null,
        token: string | null
    }>({ user: null, token: null })
    
    

    return (
        <AuthContext.Provider
            value={{
                user: data.user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


function useAuth() {
    const context = useContext(AuthContext)
}

export { AuthProvider, useAuth, AuthContext }