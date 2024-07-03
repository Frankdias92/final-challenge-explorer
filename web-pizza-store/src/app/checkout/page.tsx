'use client'

import { ButtonReturn } from "@/components/buttonReturn"
import { GetFilteredCartItems } from "@/components/header/receiptCart"
import { useOrders } from "@/hooks/orderRequest"
import { IoIosArrowBack } from "react-icons/io"


export default function CheckOut () {
    // const { cart } = useOrders()

    // const groupedCartItems = cart ? GetFilteredCartItems(cart) : []

    return (
        <section className="flex flex-col w-full h-full text-light-100 font-poppins">

            <div className="flex w-3/4 h-full m-auto items-center">
                <div className="flex w-full h-full">
                <ButtonReturn label="Checkout" center/>

                </div>

            </div>

        </section>
    )
}