'use client'

import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { PiReceipt } from "react-icons/pi";
import { BsFillHexagonFill } from "react-icons/bs";


export function Header() {
    const [menuIsOpen, setMenuOpen] = useState(false)
    
    return (
        <header className="grid w-full h-28 px-7 pb-8 bg-dark-400 content-end text-white">
            {menuIsOpen ? (
            <button
                className="flex w-full h-8 items-center gap-4 text-2xl content-end"
                onClick={() => setMenuOpen(false)}
            >
                <CgClose/>
                Menu 
            </button>
            ) : (
                <div className="flex w-full content-end justify-between items-center">
                    <button
                    className="flex h-8 items-center gap-4 text-2xl"
                    onClick={() => setMenuOpen(!false)}
                    >
                        <FiMenu/>
                    </button>

                    <span className="flex w-full items-center justify-center font-bold gap-2 text-xl tex">
                        <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                        food explorer
                    </span>

                    <span className="size-8">
                        <PiReceipt className="text-3xl"/>
                    </span>
                </div>
                
            )}
        </header>
    )
}