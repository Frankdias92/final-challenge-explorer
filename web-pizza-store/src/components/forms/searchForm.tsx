'use client'

import { ChangeEvent } from "react"
import { LabelInput } from "./inputLabel"
import { GoSearch } from "react-icons/go"
import { IoClose } from "react-icons/io5"

type SearchFormType = {
    searchTerm: string
    setSearchForm: (term: string) => void
}

export function SearchForm({searchTerm, setSearchForm}: SearchFormType) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchForm(event.target.value)
    }
    
    return (
        <div className="flex w-full h-full items-center justify-between relative">
            <input 
                type="text" 
                value={searchTerm}
                onChange={handleChange}
                placeholder="Busque por pratos ou ingredientes"
                className="flex w-full h-12 px-10 bg-dark-200  rounded-md overflow-hidden"
            />
            <GoSearch className="flex text-2xl absolute ml-2"/>
            {searchTerm && <IoClose className="flex w-fit text-2xl hover:text-light-400 absolute right-2 duration-150" 
                onClick={() => setSearchForm('')}
            />}
        </div>
    )
}