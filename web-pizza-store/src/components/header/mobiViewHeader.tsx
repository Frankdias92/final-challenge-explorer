'use client'

import { MenuDrop } from "../menuDrop";
import { CgClose } from "react-icons/cg";
import { ReceiptCart } from "../header/receiptCart";
import { FiMenu } from "react-icons/fi";
import { UseAuth } from "@/hooks/auth";

export default function MobiViewHeader () {
        const  { isMenuOpen, handleMenuOpen }  = UseAuth()
        return (
                <section className="grid md:hidden w-full h-28 px-7 m-auto content-end absolute">
                    {isMenuOpen ? (
                        <div className=" flex flex-col w-full z-20 bg-dark-400 pb-8">
                            <button
                                className="flex w-full h-8 items-center gap-4 text-2xl content-end mt-12"
                                onClick={() => handleMenuOpen(false)}
                            >
                                <CgClose/>
                                Menu
                            </button>

                            <div className="fixed flex flex-col w-full h-full bg-dark-700 top-28 left-0 ">
                                <MenuDrop />
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full h-28 m-auto content-end justify-between items-center">
                            <button
                                className="flex h-8 items-center gap-4 text-2xl"
                                onClick={() => handleMenuOpen(!false)}
                            >
                                <FiMenu/>
                            </button>
                            
                            {/* Cart Items */}
                            <ReceiptCart />
                        </div>
                        
                    )}
                </section>
        )
}