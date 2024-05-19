
export interface ParagraphProps {
    text: string
}

export function Paragraph({ text }: ParagraphProps) {

    return (
        <p className="w-fit m-auto font-poppins font-medium text-center hover:text-light-400 duration-75">
            {text}
        </p>
    )
}