'use client'

import { ButtonReturn } from "@/components/buttonReturn"
import { ButtonText } from "@/components/buttonText"
import { CheckoutCartItems } from "@/components/checkout/checkoutCartItems"
import { GetFilteredCartItems } from "@/components/header/receiptCart"
import { useOrders } from "@/hooks/orderRequest"
import { IoIosArrowBack } from "react-icons/io"


export default function CheckOut () {
    // const { cart } = useOrders()

    // const groupedCartItems = cart ? GetFilteredCartItems(cart) : []

    return (
        <section className="flex flex-col w-full h-full text-light-100 font-poppins py-8">

            <div className="flex w-3/4 h-full m-auto items-center ">
                <div className="flex flex-col w-full h-full gap-4">
                    <ButtonReturn label="Checkout" center/>

                    <span>Cart Items</span>

                    <CheckoutCartItems 
                        image={''}
                        label={'Test'}
                        price={49.90}
                        quantity={2}
                    />

                    <span>Pagamento</span>
                    <div className="flex w-full justify-between p-2 bg-dark-500 rounded-lg">
                        <span>Valor Total:</span>
                        <span>R$ 49,99</span>
                    </div>

                </div>
            </div>

            <span className="w-3/4 m-auto">
                <ButtonText text="Continue com o pagamento" size={48}/>
            </span>
        </section>
    )
}