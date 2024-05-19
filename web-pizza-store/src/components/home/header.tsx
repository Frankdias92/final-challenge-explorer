'use client'

import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { PiReceipt } from "react-icons/pi";
import { BsFillHexagonFill } from "react-icons/bs";


export function Header() {
    const [menuIsOpen, setMenuOpen] = useState(false)
    
    return (
        <header className="grid w-full h-28 px-7 pb-8 bg-dark-400 content-end text-white relative">
            {menuIsOpen ? (
                <div className="w-full ">
                    <button
                        className="flex w-full h-8 items-center gap-4 text-2xl content-end"
                        onClick={() => setMenuOpen(false)}
                    >
                        <CgClose/>
                        Menu 
                    </button>

                    <div className="absolute flex flex-col w-full min-h-screen overflow-auto bg-red-800 top-28 left-0 z-30">
                        <div className="flex flex-col w-full h-full">
                            <span>23</span>
                            <span>64</span>
                        </div>
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

                    <span className="flex w-full items-center justify-center font-bold gap-2 text-xl tex">
                        <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                        food explorer
                    </span>

                    <span className="size-8 relative">
                        <PiReceipt className="text-3xl text-center"/>
                        <span className="flex w-6 h-6 p-2 justify-center items-center rounded-full bg-tint-tomato-400 absolute
                        top-0 right-0 translate-x-1/2 -translate-y-1/4">
                            <span className="flex items-center justify-center font-medium text-sm">
                                5   
                            </span>
                        </span>
                    </span>

                </div>
                
            )}
        </header>
    )
}