'use client'

import { ProductProps, useOrders } from "@/hooks/orderRequest"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface SearchcontextProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    filteredProducts: ProductProps[]
}

const SearchContext = createContext<SearchcontextProps | undefined>(undefined)

function SearchProvider ({children}: { children: ReactNode}) {
    const { meals } = useOrders()
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([])

    useEffect(() => {
        if (meals) {
            const filtered = meals.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
                || product.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredProducts(filtered)
        }
    }, [meals, searchTerm])


    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredProducts }}>
            { children }
        </SearchContext.Provider>
    )
}

const useSearch = () => {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error('Need to set with provider')
    }
    return context
}

export { useSearch, SearchProvider}