import { ButtonText } from "@/components/buttonText";
import { LabelInput } from "@/components/forms/inputLabel";
import { Paragraph } from "@/components/paragraph";
import { BsFillHexagonFill } from "react-icons/bs";


export default function LogIn() {

    return (
        <div className="flex min-h-screen flex-col items-center px-12 py-40 bg-dark-700 text-white">
            
            <span className="flex w-full items-center justify-center gap-2 text-3xl font-roboto font-bold">
                <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                food explorer
            </span>

            <div className="flex flex-col w-full gap-y-8 mt-[73px]">
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

                <ButtonText text="Entrar"/>

                <Paragraph text="Criar uma conta"/>
            </div>

        </div>
    )
}