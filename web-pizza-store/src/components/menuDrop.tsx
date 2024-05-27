'use client'

import { GoSearch } from "react-icons/go"
import { ParagraphDivision } from "./paragraphDivision"
import { UseAuth } from "@/hooks/auth"

export function MenuDrop() {

    const  user  = UseAuth()

    console.log('user auth: ' , user)

    return (
        <div className="flex flex-col w-full min-h-full px-7 pt-12">
            <div className="flex flex-col w-full gap-9">
                <div className="flex w-full h-full items-center relative ">
                    <input 
                        placeholder="Buscar" 
                        type="text" 
                        className="flex w-full h-14 px-14 bg-dark-200  rounded-md overhi"
                    />
                    <GoSearch className="flex left-4 absolute"/>
                </div>

                <div className="flex flex-col w-full ">
                    <ParagraphDivision text="Novo prato"/>
                    <ParagraphDivision text="Sair"/>
                </div>
            </div>
            
        </div>
    )
}