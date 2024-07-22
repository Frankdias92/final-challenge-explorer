'use client'

import { useParams } from "next/navigation";
import { ProductProps } from "@/components/home/features";
import { UseAuth } from "@/hooks/auth";
import { useOrders } from "@/hooks/orderRequest";
import { api } from "@/services/api";
import { ShowProductID } from "@/components/home/id/showProductID";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useCallback, useEffect, useMemo, useState } from "react";

const fetchProducts = async (id: number): Promise<ProductProps[]> => {
    try {
        const response = await api.get(`/meals/${id}`)
        const data: ProductProps[] = response.data.map((item: any) => {
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
        return data
    } catch (error) {
        console.error(`Failed to parse ingredients for meal_id & : `, error)
        throw error
    }
}

export default function RetriveId () {
    const [data, setData] = useState<ProductProps[]>([]);
    const [itemValue, setItemValue] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true)
    const { cart } = useOrders();
    const params = useParams();
    const { user } = UseAuth();
    
    const productId = Number(params.id);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const products = await fetchProducts(productId)
                setData(products)
            } catch (error) {
                console.error('Error to getProducts: ', error)
            } finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [productId])

    const filteredProductId = useMemo(() => data.find(item => item.meal_id === productId), [data, productId])

    useEffect(() => {
        if (cart && filteredProductId) {
            const cartItem = cart.find(itemCart => itemCart.meal_id === productId);
            if (cartItem) setItemValue(cartItem.quantity);
        }
    }, [cart, productId, filteredProductId]);

    const handleSetItemValue = useCallback((value: number) => {
        setItemValue(value)
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }


    return (
        <section className="flex flex-col px-7 justify-start md:w-3/4 md:m-auto pb-12 pt-8 w-full items-center min-h-lvh font-poppins antialiased text-light-200 bg-dark-700">
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
                            src={`http://localhost:3333/files/${filteredProductId?.productImg}`}
                            alt="Product Image"
                            className="flex"
                        />
                    </span>
                </div>
                {filteredProductId && (
                    <ShowProductID
                        filteredProductId={filteredProductId}
                        itemValue={itemValue}
                        setItemValue={handleSetItemValue}
                        user={user}
                    />
                )}
            </div>
        </section>
    )
}