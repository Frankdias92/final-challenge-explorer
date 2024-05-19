'use client'

import { ButtonText } from "@/components/buttonText";
import { Image } from "@nextui-org/react"
import NextImage from "next/image";
import { useParams } from "next/navigation"
import { GoDash, GoPlus } from "react-icons/go";


interface ProductIdProps {
    id: number
}

interface ProductsProps {
    id: number
    image: string
    title: string
    price: string
    amount: string 
}


export default function ProductId({ id }: ProductIdProps) {
    const params = useParams()
    const productId = Number(params.id)
    const pathImg = 'https://raw.githubusercontent.com/Frankdias92/final-challenge-explorer/main/web-pizza-store/src/assets/menu'



    const products: ProductsProps[] = [
        {
            id: 1,
            image: "Mask%20group-6.png",
            title: "Salada Ravanello",
            price: "49,97",
            amount: "1"
        },
        {
            id: 2,
            image: "Mask%20group-1.png",
            title: "Salada Ravanello",
            price: "49,97",
            amount: "1"
        },
        {
            id: 3,
            image: "Mask%20group-2.png",
            title: "Salada Ravanello",
            price: "49,97",
            amount: "1"
        },
    ]



    const filteredProductId = products.find(item => item.id === productId)
    const item = filteredProductId


    return (
        <section className="flex flex-col px-7 w-full items-center min-h-full font-poppins antialiased text-light-200 bg-dark-700 pb-9">
             
            <div className="flex flex-col items-center w-full h-full pt-9">
                <button className="text-left mr-auto">
                    voltar
                </button>
                <span className="flex size-[264px] bg-cover my-4">
                    <Image
                        as={NextImage}
                        width={290}
                        height={290}
                        src={`${pathImg}/${item?.image}`}
                        alt="NextUI hero Image"
                        className="flex"
                    />
                </span>

                <div className="flex flex-col w-full gap-6 items-center">

                    <h2 className="text-2xl">
                        Salada
                    </h2>

                    <p className="text-base text-center w-full mt-2">
                        Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.
                    </p>

                    <span>
                        tags
                    </span>


                </div>
            </div>
            
            <div className="flex w-full justify-center items-center gap-x-4 text-lg text-white pt-12">
                <GoDash className="text-6xl"/>
                <span className="text-light-300 font-roboto font-bold text-2xl">01</span>
                <GoPlus className="text-6xl"/>

                <ButtonText text="pedir - RS 25,00"/>
            </div>
        </section>
    )
}