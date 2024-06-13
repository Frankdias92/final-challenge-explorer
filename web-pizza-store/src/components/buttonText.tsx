import Link from "next/link"

interface ButtonTextProps {
    text: string
    // link?: string
    onclick?: () => void
    size?: number
    isDisable?: boolean
}

export function ButtonText({ text, onclick, size, isDisable }: ButtonTextProps) {
    
    return (
        <button
            onClick={onclick}
            type="button"
            className={`flex w-full items-center justify-center ${size === 48 ? 'h-12' : 'h-8' }  py-1 rounded-md text-white  duration-75
                ${isDisable ? 'bg-tint-tomato-100' : 'bg-tint-tomato-400 hover:bg-tint-tomato-300'} antialiased`}
        >
            <div >
                {text}
            </div>
        </button>
    )
}