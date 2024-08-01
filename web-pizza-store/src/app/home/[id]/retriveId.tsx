'use client'

import { useParams } from "next/navigation";
import { ProductProps } from "@/components/home/features";
import { UseAuth } from "@/hooks/auth";
import { useOrders } from "@/hooks/orderRequest";
import { ShowProductID } from "@/components/home/id/showProductID";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useCallback, useEffect, useState } from "react"

export default function RetriveId () {
    const [data, setData] = useState<ProductProps>();
    const [itemValue, setItemValue] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true)
    const { meals } = useOrders();
    const params = useParams();
    const { user } = UseAuth();
    
    const meal_id = Number(params.id);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const product = meals?.find((meal) => meal.meal_id === meal_id)
                if (product) {
                    const parsedProduct = {
                        ...product,
                        ingredients: JSON.parse(product.ingredients as unknown as string)
                    }
                    setData(parsedProduct)
                } else {
                    console.error('Product not found')
                }
            } catch (error) {
                console.error('Error to getProducts: ', error)
            } finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [meals, meal_id])


    const handleSetItemValue = useCallback((value: number) => {
        setItemValue(value)
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }


    return (
        <div className="flex flex-col px-7 justify-start md:w-3/4 md:m-auto pb-12 pt-8 w-full items-center min-h-lvh font-poppins antialiased text-light-200 bg-dark-700">
            <Link
                href='/home'
                className="flex items-center text-left mr-auto text-2xl font-medium hover:text-light-400 duration-75"
            >
                <IoIosArrowBack className="size-8"/> voltar
            </Link>
            <div className="flex flex-col items-center w-full h-full md:flex-row md:justify-items-start">
                <div className="flex flex-col flex-wrap mt-10 md:col-span-2 lg:col-span-1">
                    <span className="flex size-[264px] md:mr-8 xl:size-[390px] items-center rounded-full overflow-hidden bg-cover my-4 drop-shadow-2xl">
                        <Image
                            as={NextImage}
                            width={690}
                            height={690}
                            src={`http://localhost:3333/files/${data?.productImg}`}
                            alt="Product Image"
                            className="flex"
                        />
                    </span>
                </div>
                {data && (
                    <ShowProductID
                        filteredProductId={data}
                        itemValue={itemValue}
                        setItemValue={handleSetItemValue}
                        user={user}
                    />
                )}
            </div>
        </div>
    )
}