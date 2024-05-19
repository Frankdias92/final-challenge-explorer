'use client'

import { ButtonText } from "@/components/buttonText";
import { Image } from "@nextui-org/react"
import NextImage from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"
import { GoDash, GoPlus } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { PiReceipt } from "react-icons/pi";


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

    const tags = [ 'alface', 'cebola', 'pão naan', 'pepino', 'rabanete', 'tomate' ]



    const filteredProductId = products.find(item => item.id === productId)
    const item = filteredProductId


    return (
        <section className="flex flex-col px-7 w-full items-center min-h-full font-poppins antialiased text-light-200 bg-dark-700 pb-9">
             
            <div className="flex flex-col items-center w-full h-full pt-9">
                <button className="flex items-center text-left mr-auto text-2xl font-medium hover:text-light-400 duration-75">
                <IoIosArrowBack className="size-8"/> voltar
                </button>
                <span className="flex size-[264px] bg-cover my-4 drop-shadow-2xl">
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

                    <p className="text-base text-center w-full mt-2 text-light-300">
                        Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.
                    </p>

                    <div className="flex w-full gap-6 flex-wrap justify-center">
                        {tags.map(item => {
                            return (
                                <span 
                                key={item} 
                                className="flex text-sm py-1 px-3 bg-dark-100 rounded-md"
                                >
                                    {item}
                                </span>
                            )
                        })}
                    </div>
                    


                </div>
            </div>
            
            <div className="flex w-full justify-center items-center gap-x-4 text-lg text-white pt-12">
                <GoDash className="text-6xl"/>
                <span className="text-light-300 font-roboto font-bold text-2xl">01</span>
                <GoPlus className="text-6xl"/>

                <Link href={''}
                    className="flex w-full items-center justify-center h-11 gap-2 rounded-md text-white text-xs bg-tint-tomato-400 hover:bg-tint-tomato-300 duration-75"
                >
                    <PiReceipt className="text-xl"/> 
                    inserir
                </Link>
            </div>
        </section>
    )
}