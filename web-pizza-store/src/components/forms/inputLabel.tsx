'use client'

import React, { FormEvent } from "react"

interface LabelInputProps {
    type: string
    label: string
    placeholder: string
    value: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function LabelInput({ type, label, placeholder, value, onChange }: LabelInputProps) {

    return (
        <>
            <label className="flex flex-col w-full h-full mt-8 text-xs text-light-400 font-roboto">
                {label}
            </label>
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="text-light-500 mt-2 shadow bg-dark-200 appearance-none border-none rounded-lg w-full h-11 py-2 px-3 leading-tight
                focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 duration-75"
            />
        </>
    )
}