'use client'

import { ButtonReturn } from "@/components/buttonReturn"
import { ButtonText } from "@/components/buttonText"
import { CheckoutCartItems } from "@/components/checkout/checkoutCartItems"
import { useOrders } from "@/hooks/orderRequest"


export function HandleWithCheckout () {
        const { HandleWithCurrentStep, cart } = useOrders()
    
        function handleWithCheckout() {
            HandleWithCurrentStep(1)
        }

        return (
                <section className="flex flex-col w-full h-full text-light-100 font-poppins py-8">

                        <div className="flex w-3/4 h-full m-auto items-center ">
                        <div className="flex flex-col w-full h-full gap-4">
                                <ButtonReturn label="Checkout" center/>

                                <span>Cart Items</span>

                                {cart && cart.length > 0 ? (
                                        cart.map(item => (
                                                <CheckoutCartItems 
                                                        key={item.cart_item_id}
                                                        image={item.meal_id}
                                                        label={item.name}
                                                        price={item.price}
                                                        quantity={item.quantity}
                                                />
                                        ))) : (
                                                 <span>Seu carrinho está vazio</span>
                                )}


                                <span>Pagamento</span>
                                <div className="flex w-full justify-between p-2 bg-dark-500 rounded-lg">
                                <span>Valor Total:</span>
                                <span>R$ 49,99</span>
                                </div>

                        </div>
                        </div>

                        <span className="w-3/4 m-auto">
                        <ButtonText text="Continue com o pagamento" size={48} onclick={handleWithCheckout}/>
                        </span>
                </section>
        )
}