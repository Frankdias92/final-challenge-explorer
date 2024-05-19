import Link from "next/link";
import { ParagraphProps } from "./paragraph";



export function ParagraphDivision({text}: ParagraphProps) {

    return (
        <Link href={''} 
            className="w-full font-poppins font-light text-left hover:text-light-400 duration-75 border-b
            leading-9 border-dark-100 overscroll-y-none"
        >
            {text}
        </Link>
    )
}