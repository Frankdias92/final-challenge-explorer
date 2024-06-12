import { UseAuth } from "@/hooks/auth";
import Link from "next/link";
import { BsFillHexagonFill } from "react-icons/bs";


export function LogoHeader() {
    const {user} = UseAuth()
    
    return (
        <Link
            href={'/home'}
            className="flex w-64 sm:flex-col items-center justify-center gap-x-2 relative">
            <span className=" flex items-center font-bold gap-2 text-xl">
                <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                food explorer
            </span>
            {user && user.role === 'admin' &&
                <span className="text-xs text-tint-cake-100 font-normal 
                    sm:absolute -bottom-2 right-0">
                    admin
                </span>}
        </Link>
    )
}