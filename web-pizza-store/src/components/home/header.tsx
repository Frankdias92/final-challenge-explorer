'use client'

import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { PiReceipt } from "react-icons/pi";
import { BsFillHexagonFill } from "react-icons/bs";
import { MenuDrop } from "../menuDrop";
import { UseAuth } from "@/hooks/auth";
import Link from "next/link";


export function Header() {
    const [cardItem, setCardItem] = useState(0)
    const [menuIsOpen, setMenuOpen] = useState(false)


    const  { signOut, user }  = UseAuth()

    function handleSignOut() {
        signOut()
        console.log('sign out click')
    }
    
    


    return (
        <header className="grid w-full h-28 px-7 pb-8 bg-dark-400 content-end text-white">
            {menuIsOpen ? (
                <div className="absolute flex flex-col min-w-full z-20 bg-dark-400 -translate-x-7">
                    <button
                        className="flex w-full h-8 items-center gap-4 text-2xl content-end mt-12 px-7"
                        onClick={() => setMenuOpen(false)}
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
                    onClick={() => setMenuOpen(!false)}
                    >
                        <FiMenu/>
                    </button>

                    <Link
                        href={'/home'}
                        className="flex w-full items-center justify-center font-bold gap-2 text-xl tex">
                        <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                        food explorer

                        {user && user.role === 'admin' &&
                            <span className="text-xs text-tint-cake-100 font-normal">
                                admin
                            </span>}
                    </Link>

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
        </header>
    )
}