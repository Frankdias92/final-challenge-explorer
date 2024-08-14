'use client'

import { MenuDrop } from "../menuDrop";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { UseAuth } from "@/hooks/auth";
import { PiReceipt } from "react-icons/pi";
import Link from "next/link";
import { useSearch } from "@/app/(home)/searchProvider";
import { useCart } from "@/hooks/cartOrder";

export default function MobiViewHeader () {
        const  { isMenuOpen, handleMenuOpen }  = UseAuth()
        const { totalCartQuantity } = useCart()
        const { setSearchTerm } = useSearch()

        const closeDropMenu = () => {
            handleMenuOpen(false)
            setSearchTerm('')
        }
        
        return (
                <section className="grid md:hidden w-full  px-7 mt-0 content-center absolute">
                    {isMenuOpen ? (
                        <div className=" flex flex-col w-full z-20 bg-dark-400 pb-8">
                            <button
                                className="flex w-full h-8 items-center gap-4 text-2xl content-end mt-12"
                                onClick={closeDropMenu}
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
                            <Link href={'/checkout'} className="flex w-full justify-end relative md:hidde">
                                <PiReceipt className="flex text-4xl mx-3" />
                                <span className="flex w-6 h-6 p-2 justify-center items-center rounded-full bg-tint-tomato-400 absolute -top-1 right-1">
                                    <span className="flex items-center justify-center font-medium text-sm">
                                        {totalCartQuantity}
                                    </span>
                                </span>
                            </Link>
                        </div>
                        
                    )}
                </section>
        )
}