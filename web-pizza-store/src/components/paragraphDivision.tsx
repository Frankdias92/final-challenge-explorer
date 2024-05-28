import React from "react"

interface ParagraphProps {
    text: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>  ) => void
}

export function ParagraphDivision({text, onClick}: ParagraphProps) {

    return (
        <button
            onClick={onClick}
            className="w-full font-poppins font-light text-left hover:text-light-400 duration-75 border-b
            leading-9 border-dark-100 overscroll-y-none"
        >
            {text}
        </button>
    )
}