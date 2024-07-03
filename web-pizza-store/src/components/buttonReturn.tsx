import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

type ButtonReturnProps = {
    label: string
    center?: boolean
}

export function ButtonReturn ({ label, center }: ButtonReturnProps ) {
    const router = useRouter()
    
    return (
        <div
            className="flex w-full items-center text-left mr-auto text-2xl font-medium hover:text-light-400 duration-75 cursor-pointer"
            onClick={() => router.back()}
        >
            <IoIosArrowBack className="size-8"/>
            <span className={`w-full ${center && 'text-center'}`}>
                {label}
            </span>
        </div>
    )
}