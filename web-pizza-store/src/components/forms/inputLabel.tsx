'use client'

import React, { FormEvent } from "react"

interface LabelInputProps {
    type: string
    label: string
    placeholder: string
    value: string | number | undefined
    size?: number
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function LabelInput({ type, label, placeholder, value, onChange, size }: LabelInputProps) {

    return (
        <div className="flex flex-col w-full h-full">
            <label className="flex flex-col w-full h-full mt-8 text-xs text-light-400 font-roboto antialiased">
                {label}
            </label>
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`flex text-light-500 mt-2 shadow bg-dark-200 appearance-none border-none rounded-lg w-full ${size === 48 ? 'h-14 py-5' : 'h-11' } py-2 px-3 leading-tight antialiased
                focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 placeholder:text-light-400 hover:placeholder:text-light-500 duration-300`}
            />
        </div>
    )
}