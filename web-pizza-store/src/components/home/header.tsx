'use client'

import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { PiReceiptLight } from "react-icons/pi";
import { MenuDrop } from "../menuDrop";
import { UseAuth } from "@/hooks/auth";
import { LogoHeader } from "../header/logo";
import { ButtonText } from "../buttonText";
import { SearchForm } from "../forms/searchForm";
import { GoSearch } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useOrders } from "@/hooks/orderRequest";
import { ReceiptCart } from "../header/receiptCart";


export function Header() {
    const  { signOut, user, isMenuOpen, handleMenuOpen, cart }  = UseAuth()
    const [cardItem, setCardItem] = useState<number>(0)
    const router = useRouter()

    
    return (
        <header className={`flex  w-full h-28 items-center bg-dark-400 text-light-100
            ${isMenuOpen && 'fixed z-50'}`}
        >
            {/*  DESKTOP */}
            <section className="md:grid grid-cols-3 lg:grid-cols-4 justify-stretch
                gap-4 w-3/4 h-12 m-auto">
                <div className="flex w-full h-full">
                    <LogoHeader />
                </div>
                
                <div className="hidden md:flex lg:col-span-2">
                    <SearchForm
                        placeHolder="Busque por pratos ou ingredientes"
                    >
                        <GoSearch className="text-2xl"/>
                    </SearchForm>
                </div>
                

                <div className="hidden md:flex gap-8 m-auto min-w-[216px] w-full h-full items-center text-light-100">
                    {user?.role === 'admin' && <ButtonText text="Novo prato" size={48} onclick={() => router.push('/home/new')}/> }
                    {user?.role !== 'admin' && <ButtonText text="Pedidos (0)" size={48} onclick={() => router.push('/home/test')}>
                    <PiReceiptLight />   
                    </ButtonText> }
                    <FiLogOut className="text-4xl cursor-pointer hover:text-light-400 duration-300" onClick={signOut}/>
                </div>

            </section>
            {/*  END DESKTOP */}


            {/* MOBILE */}
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
            {/* END MOBILE */}
        </header>
    )
}