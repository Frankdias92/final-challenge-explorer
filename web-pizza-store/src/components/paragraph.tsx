
interface ParagraphProps {
    text: string
}

export function Paragraph({ text }: ParagraphProps) {

    return (
        <p className="font-poppins font-medium text-center">
            {text}
        </p>
    )
}