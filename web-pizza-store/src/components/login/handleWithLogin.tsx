import { ButtonText } from "@/components/buttonText";
import { LabelInput } from "@/components/forms/inputLabel";
import { Paragraph } from "@/components/paragraph";
import { useState } from "react";


export function HandleWithLogin() {
    const [isActive, setIsActive] = useState(false)

    
    return (
        <>
        {isActive ? (
            <>
                <form 
                    className="flex flex-col"
                >
                    <LabelInput 
                        label="Name" 
                        type="text"
                        placeholder="Exemplo: exemplo@exemplo.com.br"
                        />
                    <LabelInput 
                        label="Senha" 
                        type="text"
                        placeholder="No mínimo 6 caracteres"
                    />
                </form>

                <ButtonText text="Entrar"/>

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
                        placeholder="Exemplo: Maria da Silva"
                    />
                    <LabelInput 
                        label="Email" 
                        type="text"
                        placeholder="Exemplo: exemplo@exemplo.com.br"
                    />
                    <LabelInput 
                        label="Senha" 
                        type="text"
                        placeholder="No mínimo 6 caracteres"
                    />
                </form>

                <ButtonText text="Criar conta"/>

                <button onClick={() => setIsActive(!false)}>
                    <Paragraph text="Já tenho uma conta"/>
                </button>
            </>
        ) }

        </>
    )
}