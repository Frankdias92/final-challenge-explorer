import Link from "next/link"

interface ButtonTextProps {
    text: string
    link?: string
}

export function ButtonText({ text, link }: ButtonTextProps) {

    return (
        <button
            className="flex w-full items-center justify-center h-11 rounded-md text-white bg-tint-tomato-400 hover:bg-tint-tomato-300 duration-75"
        >
            <Link href={`${link}`}>
                {text}
            </Link>
        </button>
    )
}