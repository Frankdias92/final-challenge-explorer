import { BsFillHexagonFill } from "react-icons/bs";


export function Footer() {

    return (
        <footer className="flex w-full justify-between px-7 h-[72px] bg-dark-500 items-center">

            <span className="flex w-fit items-center justify-center font-bold gap-2 text-base text-light-700">
                <span className="text-tint-cake-400 text-2xl"><BsFillHexagonFill /></span>
                food explorer
            </span>

            <p className="w-fit text-light-200 text-xs font-dmsams">© 2023 - Todos os direitos reservados.</p>
        </footer>
    )
}