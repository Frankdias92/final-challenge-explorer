
interface ButtonTextProps {
    text: string
}

export function ButtonText({ text }: ButtonTextProps) {

    return (
        <button
            className="flex w-full items-center justify-center h-11 rounded-md text-white bg-tint-tomato-400"
        >
            {text}
        </button>
    )
}