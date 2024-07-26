'use client'

import { useOrders } from "@/hooks/orderRequest";
import { CartList } from "./cartList";
import { Suspense } from "react";

export function ReceiptCart() {
    const {showGroupedCartItems, totalCartPrice, totalCartQuantity, cart} = useOrders()

    // console.log('print', {showGroupedCartItems, totalCartPrice, totalCartQuantity, cart})
 
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <CartList
                totalCartPrice={totalCartPrice || 0}
                totalCartQuantity={totalCartQuantity || 0}
                showGroupedCartItems={showGroupedCartItems}
            />
        </Suspense> 
    )
}