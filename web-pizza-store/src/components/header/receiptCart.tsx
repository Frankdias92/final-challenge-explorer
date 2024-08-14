'use client'

// import { useOrders } from "@/hooks/orderRequest";
import { CartList } from "./cartList";
import { Suspense, useEffect } from "react";
import { useCart } from "@/hooks/cartOrder";

export function ReceiptCart() {
    const {showGroupedCartItems, totalCartPrice, totalCartQuantity,} = useCart()

    useEffect(() => {
        // console.log('render cart', {showGroupedCartItems, totalCartPrice, totalCartQuantity,} )
        if (showGroupedCartItems[0] && totalCartPrice && totalCartPrice) {
            console.log('render cart', {showGroupedCartItems, totalCartPrice, totalCartQuantity,} )
        } else {
            // return console.log('print error')
        }
    }, [showGroupedCartItems, totalCartPrice, totalCartQuantity])

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