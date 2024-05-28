'use client'

import { ButtonText } from "@/components/buttonText";
import { ProductProps } from "@/components/home/features";
import { UseAuth } from "@/hooks/auth";
import { useProducts } from "@/hooks/stateProducts";
import { api } from "@/services/api";
import { Image } from "@nextui-org/react"
import NextImage from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
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
    const { handleUpdateCard } = useProducts()
    const [itemValue, setItemValue] = useState<number>(1)
    const params = useParams()
    const productId = Number(params.id)
    const pathImg = 'https://raw.githubusercontent.com/Frankdias92/final-challenge-explorer/main/web-pizza-store/src/assets/menu'

    const [data, setData] = useState<ProductProps[]>([])

    const router = useRouter()

    useEffect(() => {
        async function getProducts() {
            const response = await api.get('/meals')
            const data = response.data

            setData(data)

            console.log('tes', response.data)
        }
        
        getProducts()
    }, [])

    const tags = [ 'alface', 'cebola', 'pão naan', 'pepino', 'rabanete', 'tomate' ]



    const filteredProductId = data.find(item => item.meal_id === productId)
    const item = filteredProductId

    
    const { user } = UseAuth()


    return (
        <section className="flex flex-col px-7  pb-12 w-full items-center min-h-full font-poppins antialiased text-light-200 bg-dark-700">
             
            <div className="flex flex-col items-center w-full h-full pt-9">
                <Link
                    href='/home'
                    className="flex items-center text-left mr-auto text-2xl font-medium hover:text-light-400 duration-75"
                >
                    <IoIosArrowBack className="size-8"/> voltar
                </Link>
                <span className="flex size-[264px] bg-cover my-4 drop-shadow-2xl">
                    img
                    {/* <Image
                        as={NextImage}
                        width={290}
                        height={290}
                        src={`${pathImg}/${item?.image}`}
                        alt="NextUI hero Image"
                        className="flex"
                    /> */}
                </span>

                <div className="flex flex-col w-full gap-6 items-center">

                    <h2 className="text-2xl">
                        {filteredProductId?.name}
                    </h2>

                    <p className="text-base text-center w-full mt-2 text-light-300">
                        {filteredProductId?.description}
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
            
            {user && user.role === 'admin' ? <span className="flex w-full pt-12"><ButtonText text="Editar prato" size={48} onclick={() => router.push('/home/new')}/></span>  : (
                <div className="flex w-full justify-center items-center gap-x-4 text-lg text-white pt-12 mb-12">
                    <GoDash className="text-6xl" onClick={() => setItemValue(itemValue -1)}/>
                    <span className="text-light-300 font-roboto font-bold text-2xl">{itemValue}</span>
                    <GoPlus className="text-6xl"
                        onClick={() => setItemValue(itemValue+1)}
                    />
                    <Link href={''}
                        onClick={() => handleUpdateCard({card: itemValue})}
                        className="flex w-full items-center justify-center h-11 gap-2 rounded-md text-white text-xs bg-tint-tomato-400 hover:bg-tint-tomato-300 duration-75"
                    >
                        <PiReceipt className="text-xl"/> 
                        pedir ∙ R$ {filteredProductId?.price}
                    </Link>
                </div>  
            )}
            
        </section>
    )
}