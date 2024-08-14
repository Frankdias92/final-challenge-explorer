'use client'
import { ReactNode } from "react"
import { SearchProvider } from "./searchProvider"

interface CartProvider {
    children: ReactNode
}

export function CartProvider({ children }: CartProvider) {
    return (
        <>
            <SearchProvider>
                {children}
            </SearchProvider>
        </>
    )
}