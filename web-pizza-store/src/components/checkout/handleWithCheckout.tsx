'use client'

import { ButtonReturn } from "@/components/buttonReturn"
import { CheckoutCartItems } from "@/components/checkout/checkoutCartItems"
import { ButtonText } from "../buttonText"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/cartOrder"
import { useEffect } from "react"

export function HandleWithCheckout () {
        const { showGroupedCartItems  } = useCart()
        const router = useRouter()

        useEffect(() => {
                console.log('test props', {showGroupedCartItems})
        }, [showGroupedCartItems])
        return (
                <section className="flex flex-col w-full h-full text-light-100 font-poppins py-8">

                        <div className="flex w-full h-full m-auto items-center ">
                                <div className="flex flex-col w-full h-full gap-4">
                                        <ButtonReturn label="Voltar" />

                                        <>Cart Items</>

                                        {showGroupedCartItems && showGroupedCartItems.length > 0 ? (
                                                showGroupedCartItems.map(item => (
                                                        <CheckoutCartItems 
                                                                key={item.cart_item_id}
                                                                cart_item_id={item.cart_item_id}
                                                                productImg={item.meal_id}
                                                                name={item.name}
                                                                description={item.description}
                                                                price={item.price}
                                                                quantity={item.quantity}
                                                        />
                                                ))) : (
                                                        <i className="text-light-500">Seu carrinho está vazio</i>
                                        )}


                                        <>Pagamento</>
                                        <div className="flex w-full justify-between p-2 bg-dark-500 rounded-lg">
                                                <text>Valor Total:</text>
                                                <text>R$ {'totalPrice'}</text>
                                        </div>

                                </div>
                        </div>

                        {showGroupedCartItems && showGroupedCartItems.length > 0 &&
                        <span className="flex w-full xl:hidden mt-8">
                                <ButtonText text="Adicionar endereço" onclick={() => router.push('/checkout/delivery')} size={48}/>
                        </span>
                        }
                </section>
        )
}