'use client'

import Link from "next/link";
import { CartProps, useOrders } from "@/hooks/orderRequest";
import { IoBagRemove } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface ItemProps {
    item: CartProps
}

export function DrobMenuCart ({item}: ItemProps) {
    const { RemoveDisheOnCart } = useOrders()
    const router = useRouter()

    function removingItemCart() {
        RemoveDisheOnCart(item.cart_item_id)
    }
    
    return (
        <li className="hover:bg-dark-100 rounded-md p-2 z-10 "
                onClick={() => router.push(`home/${item.meal_id}`)}
            >
            <div className="grid grid-cols-3 justify-stretch items-center m-auto z-10">
                <Link href={`/${item.meal_id}`} className="flex flex-col w-full col-span-2">
                    <span>
                        {item.name}
                    </span>

                    <div className="grid grid-cols-2 text-light-500">
                        <span className="flex items-baseline">
                            R$ {item.price}
                        </span>
                        <span>unit: {item.quantity}</span>
                    </div>
                </Link>

                <IoBagRemove className="text-xl justify-self-end z-50 hover:text-light-500 cursor-grabbing"
                    onClick={removingItemCart}
                />
            </div>
            <div className="w-full h-0.5 bg-dark-100"/>
        </li>
    )
}