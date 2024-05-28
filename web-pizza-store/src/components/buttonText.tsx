import Link from "next/link"

interface ButtonTextProps {
    text: string
    // link?: string
    onclick?: () => void
    size?: number
}

export function ButtonText({ text, onclick, size }: ButtonTextProps) {
    
    return (
        <button
            onClick={onclick}
            className={`flex w-full items-center justify-center ${size === 48 ? 'h-11' : 'h-8' }  py-1 rounded-md text-white bg-tint-tomato-400 hover:bg-tint-tomato-300 duration-75`}
        >
            <div >
                {text}
            </div>
        </button>
    )
}