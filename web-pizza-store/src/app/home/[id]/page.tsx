'use client'

import { ButtonText } from "@/components/buttonText";
import { ProductProps } from "@/components/home/features";
import { UseAuth } from "@/hooks/auth";
import { api } from "@/services/api";
import { Image } from "@nextui-org/react"
import NextImage from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { PiReceipt } from "react-icons/pi";


interface ProductsProps {
    id: number
    image: string
    title: string
    price: string
    ingredients: string[]
    amount: string 
}


export default function ProductId() {
    const [itemValue, setItemValue] = useState<number>(1)
    const params = useParams()
    const productId = Number(params.id)

    const [data, setData] = useState<ProductProps[]>([])

    const router = useRouter()

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await api.get(`/meals/${params.id}`)
                const data = response.data.map((item: any) => {
                    let ingredients
                    try {
                        ingredients = JSON.parse(item.ingredients)
                    } catch (error) {
                        console.error(`Failed to parse ingredients for meal_id ${item.meal_id}: `, error)
                        ingredients = []
                    }
                    return {
                        ...item,
                        ingredients
                    }
                })
                console.log(data[0])
                setData(data)
            } catch (error) {
                console.error(`Failed to parse ingredients for meal_id & : `, error)
            }
        }
        getProducts()
    }, [params])

    const filteredProductId = data.find(item => item.meal_id === productId)
    const item = filteredProductId
    const { user } = UseAuth()


    return (
        <section className="flex flex-col px-7 justify-start md:w-3/4 md:m-auto pb-12 pt-8 w-full items-center min-h-screen font-poppins antialiased text-light-200 bg-dark-700">
             
                    <Link
                        href='/home'
                        className="flex items-center text-left mr-auto text-2xl font-medium hover:text-light-400 duration-75"
                    >
                        <IoIosArrowBack className="size-8"/> voltar
                    </Link>
            <div className="flex flex-col items-center w-full h-full 
                md:grid grid-cols-2 md:justify-items-start"
            >

                {/* col 1 */}
                <div className="flex flex-col flex-wrap mt-10">
                    <span className="flex size-[264px] md:size-[390px] items-center rounded-full overflow-hidden bg-cover my-4 drop-shadow-2xl">
                        <Image
                            as={NextImage}
                            width={690}
                            height={690}
                            src={`http://localhost:3333/files/${item?.productImg}`}
                            alt="NextUI hero Image"
                            className="flex"
                        />
                    </span>
                </div>

                {/* col 2 */}
                <div className="flex flex-col w-full gap-6 items-center md:justify-self-start md:items-start">

                    <h2 className="text-2xl w-full flex md:font-medium md:text-[40px]">
                        {filteredProductId?.name}
                    </h2>

                    <p className="text-base text-center md:text-start md:text-2xl w-full text-light-300">
                        {filteredProductId?.description}
                    </p>

                    <div className="flex w-full gap-6 flex-wrap justify-center md:justify-start">
                        {item?.ingredients.map((ingredients, index) => {
                            return (
                                <span 
                                    key={index} 
                                    className="flex text-sm py-1 px-3 bg-dark-100 rounded-md md:font-medium text-light-100"
                                >
                                    {ingredients}
                                </span>
                            )
                        })}
                    </div>


                    {user && user.role === 'admin' 
                        ? <span className="flex w-full pt-12"><ButtonText text="Editar prato" size={48} onclick={() => router.push(`/home/${params.id}/edit`)}/></span>  
                        : (
                            <div className="flex w-full justify-center items-center gap-x-4 text-lg text-white pt-12 mb-12">
                                <GoDash className="text-6xl" onClick={() => setItemValue(itemValue -1)}/>
                                <span className="text-light-300 font-roboto font-bold text-2xl">{itemValue}</span>
                                <GoPlus className="text-6xl"
                                    onClick={() => setItemValue(itemValue+1)}
                                />
                                <Link href={''}
                                    onClick={() => console.log({card: itemValue})}
                                    className="flex w-full items-center justify-center h-11 gap-2 rounded-md text-white text-xs bg-tint-tomato-400 hover:bg-tint-tomato-300 duration-75"
                                >
                                    <PiReceipt className="text-xl"/> 
                                    pedir ∙ R$ {filteredProductId?.price}
                                </Link>
                            </div>  
                        )
                    }
                </div>


            </div>
            
           
            
        </section>
    )
}