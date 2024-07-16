import { UseAuth } from "@/hooks/auth";
import HandleViewHeader from "../header/handleViewHeader";
import { Suspense } from "react";

export default function Header() {
    const  { isMenuOpen }  = UseAuth()

    return (
        <header className={`flex  w-full h-28 items-center bg-dark-400 text-light-100
            ${isMenuOpen && 'fixed z-50'}`}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <HandleViewHeader />
            </Suspense>
        </header>
    )
}