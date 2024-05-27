'use client'

import { ButtonText } from "@/components/buttonText";
import { LabelInput } from "@/components/forms/inputLabel";
import { Paragraph } from "@/components/paragraph";
import { useState } from "react";

import { api } from '../../services/api'
import { UseAuth } from "@/hooks/auth";


export function HandleWithLogin() {
    const [isActive, setIsActive] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { singIn } = UseAuth()
    
    function handleSignIn() {  
        singIn({ email, password })
    }
    
    async function handleSignUp() {
        if (!name || !email || !password) {
            return alert('Preencha os dados')
        }

        try {
            const data = await api.post('users', { name, email, password })
            alert('Usuário cadastrado com sucesso')
            setIsActive(true)
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }
    
    return (
        <>
        {isActive ? (
            <>
                <form 
                    className="flex flex-col"
                >
                    <LabelInput 
                        label="Email" 
                        type="text"
                        value={email}
                        placeholder="Exemplo: exemplo@exemplo.com.br"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <LabelInput 
                        label="Senha" 
                        type="text"
                        value={password}
                        placeholder="No mínimo 6 caracteres"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </form>

                <ButtonText text="Entrar" onclick={handleSignIn}/>

                <button onClick={() => setIsActive(false)}>
                    <Paragraph text="Criar uma conta"/>
                </button>
            </>
        ) : (
            <>
                <form 
                    className="flex flex-col"
                >
                    <LabelInput 
                        label="Seu nome" 
                        type="text"
                        value={name}
                        placeholder="Exemplo: Maria da Silva"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <LabelInput 
                        label="Email" 
                        type="text"
                        value={email}
                        placeholder="Exemplo: exemplo@exemplo.com.br"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <LabelInput 
                        label="Senha" 
                        type="text"
                        value={password}
                        placeholder="No mínimo 6 caracteres"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </form>

                <ButtonText text="Criar conta" onclick={handleSignUp}/>

                <button onClick={() => setIsActive(!false)}>
                    <Paragraph text="Já tenho uma conta"/>
                </button>
            </>
        ) }

        </>
    )
}