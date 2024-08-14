'use client'

import { ReactNode } from "react"
import { SearchProvider } from "./searchProvider"
import { CartProvider } from "@/hooks/cartOrder"

interface CartProvider {
    children: ReactNode
}

export function ProviderHomeCart({ children }: CartProvider) {
    return (
        <>
        <CartProvider>
            <SearchProvider>
                {children}
            </SearchProvider>
        </CartProvider>
        </>
    )
}