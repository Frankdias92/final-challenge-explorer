'use client'

import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { LogoHeader } from "../header/logo";
import { ButtonText } from "../buttonText";
import { SearchForm } from "../forms/searchForm";
import { GoSearch } from "react-icons/go";
import { UseAuth } from "@/hooks/auth";
import { ReceiptCart } from "../header/receiptCart";
import { useRouter } from "next/navigation";

export default function DesktopView () {
        const { user, signOut } = UseAuth()
        const router = useRouter()

        return (
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
                        {user?.role === 'admin' ? (
                                <ButtonText text="Novo prato" size={48} onclick={() => router.push('/home/new')}/> 
                            ) : (
                                <ReceiptCart />
                                )
                        }
                        <FiLogOut className="text-4xl cursor-pointer hover:text-light-400 duration-300" onClick={signOut}/>
                    </div>

                </section>
        )
}