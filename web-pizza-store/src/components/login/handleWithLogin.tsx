'use client'

import { ButtonText } from "@/components/buttonText";
import { LabelInput } from "@/components/forms/inputLabel";
import { Paragraph } from "@/components/paragraph";
import { useState } from "react";
import { api } from '../../services/api'
import { UseAuth } from "@/hooks/auth";
import { LoaderProducts } from "../loader/LoaderProducts";

export default function HandleWithLogin() {
    const [isActive, setIsActive] = useState(true)
    const { signIn } = UseAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loader, setLoader] = useState(false)

    function handleSignIn() {  
        setLoader(true)
        if (!email || !password) {
            setLoader(false)
            return alert('Preencha os dados')
        }
        try {
            signIn({ email, password })
        } catch (error: any) {
            return alert(error.response.data.message || 'Erro ao fazer login do usuario')
        } finally {
            setLoader(false)
        }
    }
    
    async function handleSignUp() {
        setLoader(true)
        if (!name || !email || !password) {
            setLoader(false)
            return alert('Preencha os dados')
        }
        try {
            const response = await api.post('/users', { name, email, password })
            alert('Usuário cadastrado com sucesso')
            setIsActive(true)
        } catch (error: any) {
            return alert(error.response.data.error || 'Erro ao cadastrar usuario')
        } finally {
            setLoader(!true)
        }
    }
 
    return (
        <>
        {isActive ? (
            <div className="flex w-full flex-col">
                <span className="hidden lg:flex w-full text-3xl font-medium m-auto">Faça login</span>
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

                <div className="flex flex-col w-full m-auto pt-9 gap-8">
                {loader ? ( <LoaderProducts />) : (
                        <ButtonText text="Entrar" onclick={handleSignIn} size={48}/>
                    )}

                    <button onClick={() => setIsActive(false)}>
                        <Paragraph text="Criar uma conta"/>
                    </button>
                </div>
            </div>
        ) : (
            <div className="flex w-full flex-col">
                <span className="hidden lg:flex w-full text-3xl font-medium m-auto">Crie sua conta</span>
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

                <div className="flex flex-col w-full m-auto pt-9 gap-8">
                    {loader ? ( <LoaderProducts />) : (
                        <ButtonText text="Criar conta" onclick={handleSignUp} size={48}/>
                    )}

                    <button onClick={() => setIsActive(!false)}>
                        <Paragraph text="Já tenho uma conta"/>
                    </button>
                </div>
                
            </div>
        ) }

        </>
    )
}