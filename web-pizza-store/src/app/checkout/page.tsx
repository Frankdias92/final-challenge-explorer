'use client'

import { DrobMenuCart } from "@/components/cart/drobMenuCart"
import { GetFilteredCartItems } from "@/components/header/receiptCart"
import { useOrders } from "@/hooks/orderRequest"


export default function CheckOut () {
    const { cart } = useOrders()

    const groupedCartItems = cart ? GetFilteredCartItems(cart) : []

    console.log('print cart', cart)
    return (
        <section className="flex w-full h-full text-light-100 font-poppins">

            <div className="flex w-3/4 h-full m-auto items-center">
                <div className="flex w-full h-full">
                    CheckOut
                </div>

                <div className="flex w-full h-full">
                    {groupedCartItems?.map((item) => (
                        <li key={item.meal_id}
                            className="hover:bg-dark-100 rounded-md p-2"
                            // onClick={() => router.push(`home/${item.meal_id}`)}
                        >
                                <DrobMenuCart item={item}/>
                                <div className="w-full h-0.5 bg-dark-100"/>
                        </li>
                    ))}
                </div>
            </div>

        </section>
    )
}