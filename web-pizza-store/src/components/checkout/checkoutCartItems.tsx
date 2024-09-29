
import { useOrders } from "@/hooks/orderRequest";
import { api } from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoBagRemove } from "react-icons/io5";

type CheckoutItems = {
    cart_item_id: number
    productImg: number
    name: string
    description: string
    price: number
    quantity: number
}

export function CheckoutCartItems ({ productImg, name, description, price, quantity, cart_item_id }: CheckoutItems) {
    const [imageParams, setImageParams] = useState<string>('')
    const { RemoveDisheOnCart } = useOrders()

    useEffect(() => {
        try {
            const fetchProductImage = async() => {
                const response = await api.get(`${process.env.NEXT_PUBLIC_DB}/meals/${productImg}`)
                const data = response.data
                if (data) {
                    setImageParams(data[0].productImg)
                }
            }
            fetchProductImage()
        } catch (error) {
            console.error('Failed to get product image', error)
        }
    }, [productImg])
    
    return (
        <div className="flex w-full h-48 border-b-dark-500 border-b-4 p-4 gap-4">
            <div className="flex h-full items-center">
                <Image
                        // loading="lazy"
                        // placeholder="blur"
                        // blurDataURL="data:'img/png"
                        width={690}
                        height={690}
                        quality={100}
                        priority
                        src={`${process.env.NEXT_PUBLIC_URL_FILES}/${imageParams}`}
                        alt={`Imagem de ${name}`}
                        className="flex rounded-full w-48"
                    />
            </div>

            <div className="flex flex-col w-full justify-between mt-0 py-8 text-light-100">
                <div className="flex flex-col leading-6 ">
                    <h3 className="flex font-semibold font-roboto text-xl">
                        {name}
                    </h3>
                    <p className="font-poppins text-base text-light-300">
                        {description}
                    </p>
                </div>

                <p className="w-full text-sm font-roboto">
                    R$ {price}
                </p>
            </div>

            <div className="flex flex-col m-auto min-w-fit h-full py-8 justify-end items-end">
                <IoBagRemove className="h-full text-2xl hover:text-light-400 hover:cursor-pointer"
                    onClick={() => RemoveDisheOnCart(cart_item_id)}
                />
                <p className="flex w-full items-center bg-dark-600 text-light-500 text-xs font-roboto px-2 rounded-md">
                    quantidade: {quantity}
                </p>
            </div>
        </div>
    )
}