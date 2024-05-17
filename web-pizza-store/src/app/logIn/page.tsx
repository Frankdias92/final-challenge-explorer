'use client'


import { HandleWithLogin } from "@/components/login/handleWithLogin";
import { BsFillHexagonFill } from "react-icons/bs";


export default function LogIn() {

    return (
        <section className="flex min-h-screen flex-col items-center px-12 py-40 bg-dark-700 text-white">

            <span className="flex w-full items-center justify-center font-bold gap-2 text-3xl">
                <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                food explorer
            </span>

            <div className="flex flex-col w-full gap-8 mt-[73px]">
                <HandleWithLogin />
            </div>

        </section>
    )
}