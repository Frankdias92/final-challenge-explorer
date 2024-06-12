'use client'

import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { PiReceipt } from "react-icons/pi";
import { BsFillHexagonFill } from "react-icons/bs";
import { MenuDrop } from "../menuDrop";
import { UseAuth } from "@/hooks/auth";
import Link from "next/link";
import { LogoHeader } from "../header/logo";
import { ButtonText } from "../buttonText";


export function Header() {
    const [cardItem, setCardItem] = useState(0)
    // const [menuIsOpen, setMenuOpen] = useState(false)


    const  { signOut, user, isMenuOpen, handleMenuOpen }  = UseAuth()

    return (
        <header className="flex w-full h-28 bg-dark-400 text-light-100 relative">
            {/*  DESKTOP */}
            <section className="sm:flex w-3/4 items-center gap-4 justify-between m-auto">
            {/* <span className=""> */}
                <LogoHeader />
                
            {/* </span> */}
                
                <div className="hidden sm:flex text-sm w-full">
                    <input 
                        placeholder="Busque por pratos ou ingredientes"
                        className="bg-dark-200 rounded-lg w-full"
                    />
                
                    <ButtonText text="Novo prato"/>
                </div>
            </section>
            {/*  END DESKTOP */}


            {/* MOBILE */}
            <section className="grid sm:hidden w-full h-28 px-7 pb-8  content-end absolute">
            {isMenuOpen ? (
                <div className="absolute flex flex-col min-w-full z-20 bg-dark-400 -translate-x-7">
                    <button
                        className="flex w-full h-8 items-center gap-4 text-2xl content-end mt-12 px-7"
                        onClick={() => handleMenuOpen(false)}
                    >
                        <CgClose/>
                        Menu
                    </button>

                    <div className="fixed flex flex-col w-full min-h-screen bg-dark-700 top-28 left-0 ">
                        <MenuDrop />
                    </div>
                </div>
            ) : (
                <div className="flex w-full content-end justify-between items-center">
                    <button
                    className="flex h-8 items-center gap-4 text-2xl"
                    onClick={() => handleMenuOpen(!false)}
                    >
                        <FiMenu/>
                    </button>

                    

                    {user && user.role === 'customer' &&
                        <span className="size-8 relative">
                            <PiReceipt className="text-3xl text-center"/>
                            <span className="flex w-6 h-6 p-2 justify-center items-center rounded-full bg-tint-tomato-400 absolute
                            top-0 right-0 translate-x-1/2 -translate-y-1/4">
                                <span className="flex items-center justify-center font-medium text-sm">
                                    {cardItem}
                                </span>
                            </span>
                        </span>
                    }
                </div>
                
            )}
            </section>
            {/* END MOBILE */}
        </header>
    )
}