'use client'

import { UseAuth } from "@/hooks/auth";
import Link from "next/link";
import { BsFillHexagonFill } from "react-icons/bs";


export function LogoHeader() {
    const {user} = UseAuth()
    
    return (
        <div className="flex w-fit h-full items-center z-20">
            <Link
                href={'/'}
                className="flex w-full md:flex-col items-center gap-x-2 relative">
                <span className=" flex min-w-[185px] items-center font-bold gap-2 text-xl">
                    <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                    food explorer
                </span>
                {user && user.role === 'admin' &&
                    <span className="text-xs text-tint-cake-100 font-normal 
                        absolute md:place-self-end pr-1 -bottom-2 right-0">
                        admin
                    </span>}
            </Link>
        </div>
    )
}