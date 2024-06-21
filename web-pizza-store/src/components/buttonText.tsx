import { ReactNode } from "react"

interface ButtonTextProps {
    text: string
    // link?: string
    onclick?: () => void
    size?: number
    isDisable?: boolean
    children?: ReactNode
}

export function ButtonText({ text, onclick, size, isDisable, children }: ButtonTextProps) {
    
    return (
        <button
            onClick={onclick}
            type="button"
            className={`flex w-full items-center justify-center ${size === 48 ? 'h-12' : 'h-8' }  py-1 rounded-md text-white  duration-75
                ${isDisable ? 'bg-tint-tomato-100' : 'bg-tint-tomato-400 hover:bg-tint-tomato-300'} antialiased`}
        >
            <div className="flex items-center px-6 w-full gap-2 m-auto">
                <span className="text-3xl">{children}</span>
                {text}
            </div>
        </button>
    )
}