'use client'

import { useOrders } from "@/hooks/orderRequest";
import { api } from "@/services/api";
import { Image } from "@nextui-org/react"
import NextImage from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IoBagRemove } from "react-icons/io5";

type CheckoutItems = {
    cart_item_id: number
    image: number
    label: string
    price: number
    quantity: number
}

export function CheckoutCartItems ({ image, label, price, quantity, cart_item_id }: CheckoutItems) {
    const [productImg, setProductImg] = useState<string>('')
    const { RemoveDisheOnCart } = useOrders()

    const fetchImgCard = useCallback(async () => {
        try {
            if (image) {
                const response = await api.get(`/meals/${image}`)
                setProductImg(response.data[0].productImg)
                // console.log('pass throw')
            }
        } catch (error) {
                console.error('Error ao buscar image do produto ', error)
        }
}, [image])

    useEffect(() => {
            fetchImgCard()
    }, [fetchImgCard])
    
    return (
        <div className="flex w-full h-48 border-b-dark-500 border-b-4 p-4 gap-4">
            <div className="flex h-full items-center">
                <Image
                        as={NextImage}
                        width={690}
                        height={690}
                        quality={100}
                        src={`${process.env.NEXT_PUBLIC_URL_FILES}/${productImg}` /* || 'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A3333%2Ffiles%2F44d6d72e16447cb98ec4-63c83ebeef5ea2f341f3dd4c_OG-perpetuo.jpg&w=640&q=75' */}
                        alt={`Imagem de ${label}`}
                        className="flex rounded-full w-48"
                    />
            </div>

            <div className="flex flex-col w-full justify-between mt-0 py-8 text-light-100">
                <div className="flex flex-col leading-6 ">
                    <h3 className="flex font-semibold font-roboto text-xl">
                        {label}
                    </h3>
                    <p className="font-poppins text-base text-light-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam minus sapiente nulla eius.
                    </p>
                </div>

                <p className="w-full text-sm font-roboto">
                    R$ {price}
                </p>
            </div>

            <div className="flex flex-col m-auto min-w-fit h-full py-8 justify-end items-end">
                <IoBagRemove className="h-full text-2xl hover:text-light-400 cursor-pointer"
                    onClick={() => RemoveDisheOnCart(cart_item_id)}
                />
                <p className="flex w-full items-center bg-dark-600 text-light-500 text-xs font-roboto px-2 rounded-md">
                    quantidade: {quantity}
                </p>
            </div>
        </div>
    )
}