'use client'

import { ButtonText } from "@/components/buttonText";
import { LabelInput } from "@/components/forms/inputLabel";
import { Paragraph } from "@/components/paragraph";
import { TestComponent } from "@/components/test";
import { BsFillHexagonFill } from "react-icons/bs";


export default function LogIn() {

    return (
        <section className="flex min-h-screen flex-col items-center px-12 py-40 bg-dark-700 text-white">

            <span className="flex w-full items-center justify-center font-bold gap-2 text-3xl">
                <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                food explorer
            </span>

            <TestComponent />

            <div className="flex flex-col w-full gap-8 mt-[73px]">
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

                <Paragraph text="Criar uma conta"/>
            </div>

        </section>
    )
}