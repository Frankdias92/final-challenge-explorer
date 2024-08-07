'use client'

import { FiLogOut } from "react-icons/fi";
import { LogoHeader } from "../header/logo";
import { ButtonText } from "../buttonText";
import { SearchForm } from "../forms/searchForm";
import { UseAuth } from "@/hooks/auth";
import { ReceiptCart } from "../header/receiptCart";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/(home)/searchProvider";
import { FaUserCircle } from "react-icons/fa";

export default function DesktopView () {
    const { searchTerm, setSearchTerm} = useSearch()
        const { user, signOut } = UseAuth()
        const router = useRouter()

        return (
                <section className="md:grid grid-cols-3 lg:grid-cols-4 justify-stretch
                    gap-4 w-3/4 h-12 ml-7 pl-8 md:ml-auto md:pl-0 md:m-auto">
                    <div className="flex w-full h-full relative">
                        <LogoHeader />
                    </div>
                    
                    <div className="hidden h-auto md:flex lg:col-span-2 ">
                        <SearchForm 
                            searchTerm={searchTerm}
                            setSearchForm={setSearchTerm}
                        />
                    </div>
                    
                    <div className="hidden md:flex gap-8 m-auto min-w-[216px] w-full h-full items-center text-light-100">
                        {user?.role === 'admin' ? (
                                <ButtonText text="Novo prato" size={48} onclick={() => router.push('/new')}/> 
                            ) : (
                                <ReceiptCart />
                                )
                        }
                        {user ? ( <FiLogOut className="text-4xl cursor-pointer hover:text-light-400 duration-300" onClick={signOut}/> ) 
                            : ( <FaUserCircle onClick={() => router.push('/login')} className="flex text-2xl text-light-100 ursor-pointer hover:text-light-400 duration-300"/> )
                        } 
                    </div>

                </section>
        )
}