'use client'

import { ReactNode } from "react"

interface ButtonTextProps {
    text: string
    onclick?: () => void
    size?: number
    isDisable?: boolean
    colorDark?: boolean
    children?: ReactNode
}

export function ButtonText({ text, onclick, size, isDisable, colorDark, children }: ButtonTextProps) {
    
    return (
        <button
            onClick={onclick}
            type="button"
            className={`flex flex-col min-w-fit w-full justify-center ${size === 48 ? 'h-12' : 'h-8' }  py-1 rounded-md text-white  duration-75
            ${colorDark === true ?
                ('bg-dark-300 hover:bg-dark-100')
                :  isDisable ? 'bg-tint-tomato-100' : 'bg-tint-tomato-400 hover:bg-tint-tomato-300'} 
                antialiased`}
        >
            <div className="flex items-center justify-center  w-full gap-2 px-6 text-center justify-self-center">
                <span className="text-3xl">{children}</span>
                {text}
            </div>
        </button>
    )
}