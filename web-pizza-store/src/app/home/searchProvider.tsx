'use client'

import { LabelInput } from "@/components/forms/inputLabel"
import { ProductProps, useOrders } from "@/hooks/orderRequest"
import { ChangeEvent, createContext, ReactNode, useContext, useEffect, useState } from "react"

interface SearchcontextProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    filteredProducts: ProductProps[] | string
}

const SearchContext = createContext<SearchcontextProps | undefined>(undefined)

function SearchProvider ({children}: { children: ReactNode}) {
    const { meals } = useOrders()
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredProducts, setFilteredProducts] = useState('')

    useEffect(() => {
        if (meals) {
            const filtered = meals.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
                || product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredProducts(filtered as unknown as string)
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