'use client'

import { ChangeEvent } from "react"
import { LabelInput } from "./inputLabel"

type SearchFormType = {
    searchTerm: string
    setSearchForm: (term: string) => void
}

export function SearchForm({searchTerm, setSearchForm}: SearchFormType) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchForm(event.target.value)
    }
    
    return (
        <div className="flex w-full h-full items-center">
            <input 
                type="text" 
                value={searchTerm}
                onChange={handleChange}
                placeholder="Busque por pratos ou ingredientes"
                className="flex w-full h-12 px-4 bg-dark-200  rounded-md overflow-hidden"
            />
        </div>
    )
}