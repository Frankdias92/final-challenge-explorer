import { CartProps, useOrders } from "@/hooks/orderRequest";
import { useEffect, useState } from "react";
import { IoBagRemove } from "react-icons/io5";

interface ItemProps {
    item: CartProps
}

export function DrobMenuCart ({item}: ItemProps) {
    const { RemoveDisheOnCart } = useOrders()

    function removingItemCart() {
        RemoveDisheOnCart(item.cart_item_id)
    }
    
    return (
        <div className="grid grid-cols-3 justify-stretch items-center m-auto">
            <div className="flex flex-col w-full col-span-2">
                <span>
                    {item.name}
                </span>

                <div className="grid grid-cols-2 text-light-500">
                    <span className="flex items-baseline">
                        R$ {item.price}
                    </span>
                    <span>unit: {item.quantity}</span>
                </div>
            </div>

            <IoBagRemove className="text-xl justify-self-end z-50 hover:text-light-500"
                onClick={removingItemCart}
            />
        </div>
    )
}