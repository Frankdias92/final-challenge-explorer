
import Link from "next/link";
import { BsFillHexagonFill } from "react-icons/bs";


export function Footer() {

    return (
        <footer className="flex w-full px-7 md:h-[72px]  bg-dark-500 py-6"
        >

            <div className="flex w-full md:w-3/4 md:items-center justify-between md:m-auto">
                <span className="flex w-fit items-start md:justify-center font-bold gap-2 text-base text-light-700">
                    <span className="text-tint-cake-400 text-2xl"><BsFillHexagonFill /></span>
                    food explorer
                </span>

                <p className="flex w-fit flex-col items-end text-light-200 text-xs font-dmsams gap-2 md:flex-row">
                    © 2024 - Todos os direitos reservados.

                    <Link href={'https://www.linkedin.com/in/franklinmacedodias/'} target="_blank">
                        Franklin Macedo
                    </Link>
                </p>

            </div>
        </footer>
    )
}