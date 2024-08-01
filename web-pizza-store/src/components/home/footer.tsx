
import Link from "next/link";
import { BsFillHexagonFill } from "react-icons/bs";


export function Footer() {

    return (
        <footer className="flex w-full px-7 md:h-[72px]  bg-dark-500 py-6"
        >

            <div className="flex w-full md:w-3/4 md:items-center justify-between md:m-auto">
                <span className="flex w-fit items-start md:justify-center font-bold gap-2 text-base text-light-700
                font-roboto lg:text-2xl antialiased"
            >
                    <span className="text-tint-cake-400 text-2xl"><BsFillHexagonFill /></span>
                    food explorer
                </span>

                <p className="flex w-fit flex-col items-end text-light-200 text-xs lg:text-sm font-dmsams gap-2 md:flex-row antialiased">
                    © 2024 - Todos os direitos reservados.

                    <Link href={'https://www.linkedin.com/in/franklin-md/'} target="_blank">
                        Franklin Macedo
                    </Link>
                </p>

            </div>
        </footer>
    )
}