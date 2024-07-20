import ProductForm from "@/components/home/new/productForm";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function AddNewDisher() {
    return (
        <section className="flex flex-col w-full h-fit px-8 pb-14 md:px-0
            md:w-3/4 m-auto md:relative md:mt-10">
            <Link
                href='/home'
                className="flex items-center text-left mr-auto pt-3 font-medium md:font-bold md:text-2xl text-base text-light-300 hover:text-light-400 duration-75">
                <IoIosArrowBack className="flex mt-1 text-2xl md:text-4xl" />
                voltar
            </Link>

            <h2 className="text-3xl font-roboto text-light-300 antialiased pt-6 pb-6 md:pb-0
                md:font-medium">
                Novo prato
            </h2>

            <ProductForm />
        </section>
    )
}