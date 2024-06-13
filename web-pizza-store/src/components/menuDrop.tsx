'use client'

import { GoSearch } from "react-icons/go"
import { ParagraphDivision } from "./paragraphDivision"
import { UseAuth } from "@/hooks/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SearchForm } from "./forms/searchForm"

interface isMenuOpenProps {
    isMenuOpen: boolean
}


export function MenuDrop() {
    const  { signOut, user, handleMenuOpen, isMenuOpen }  = UseAuth()
    // const [menuIsOpen, setMenuOpen] = useState(true)
    const router = useRouter()

    function handleClickNewDishe() {
        router.push('/home/new')
        handleMenuOpen(false)
    }

    function handleSignOutRouter() {
        signOut()
        router.push('/login')
        handleMenuOpen(false)
    }

    return (
        <>
            {isMenuOpen &&
                <div className="flex flex-col w-full min-h-full px-7 pt-12 z-40">
                    <div className="flex flex-col w-full gap-9">
                        <SearchForm
                            placeHolder="Buscar"
                        >
                             <GoSearch className="text-2xl"/>
                        </SearchForm>

                        <div className="flex flex-col w-full text-light-300">
                            { user?.role === 'admin' && <ParagraphDivision text="Novo prato" onClick={handleClickNewDishe}/>}
                            <ParagraphDivision text="Sair" onClick={handleSignOutRouter}/>
                        </div>
                    </div>
                    
                </div>
            }
        </>
    )
}