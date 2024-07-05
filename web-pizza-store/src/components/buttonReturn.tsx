import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

type ButtonReturnProps = {
    label: string
    context?: string
    center?: boolean
}

export function ButtonReturn ({ label, context, center }: ButtonReturnProps ) {
    const router = useRouter()
    
    return (
        <div className="flex flex-col gap-4">
            <div
                className="flex w-full items-center text-left mr-auto text-2xl font-medium hover:text-light-400 duration-75 cursor-pointer"
                onClick={() => router.back()}
                >
                <IoIosArrowBack className="size-8"/>
                <h3 className={`w-full ${center && 'text-center'}`}>
                    {label}
                </h3>
            </div>
            <p className="font-poppins text-sm">{context}</p>
        </div>
    )
}