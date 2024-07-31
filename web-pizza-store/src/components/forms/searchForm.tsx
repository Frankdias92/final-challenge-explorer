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
        <LabelInput 
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Busque por pratos ou ingredientes"
            size={48}
        />
    )
}