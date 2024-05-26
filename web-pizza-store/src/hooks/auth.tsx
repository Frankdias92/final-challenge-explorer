import { createContext, useContext, useState } from "react";

interface SingInProps {
    email: string
    password: string
    role: string
}
interface User {
    name: string
    email: string
    password: string
    role: string
}



interface AuthContextProps {
    user: User | null
    singIn: (SingInProps: SingInProps) => void
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    singIn: () => {}
})

function AuthProvider({ children }:any) {
    const [data, setData] = useState<{
        user: User | null,
        token: string | null
    }>({ user: null, token: null })
    
    function singIn({ email, password, role }: SingInProps) {
        
    }

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


function useAuth() {
    const context = useContext(AuthContext)
}

export { AuthProvider, useAuth, AuthContext }