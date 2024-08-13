'use client'

import { UseAuth } from "@/hooks/auth"
import { IoIosArrowBack } from "react-icons/io"
import { useRouter } from "next/navigation"
import { HandleWithUpdate } from "@/components/home/edit/handleWithUpdate"


export default function UpdateDisher() {
    const { user } = UseAuth()
    const router = useRouter()

    return (
        <>
        {user?.role === 'admin' &&
        <section className="flex flex-col w-full h-fit pb-14 px-8 md:px-0 
            md:w-3/4 m-auto md:pb-20 md:mt-10">
            <span
                onClick={() => router.back()}
                className="flex items-center text-left mr-auto pt-3 font-medium md:font-bold md:text-2xl text-base text-light-300 hover:text-light-400 duration-75
                cursor-pointer"
            >
                <IoIosArrowBack className="text-2xl" />
                    voltar
            </span>

            <h2 className="text-3xl font-roboto text-light-300 antialiased pt-6 pb-6 md:pb-0
                md:font-medium"
            >
                Atualizar prato
            </h2>

            <HandleWithUpdate />
            
        </section>
        }
        </>
    )
}