// 'use client'

// import { useOrders } from "@/hooks/orderRequest";
import { CartList } from "./cartList";
// import {  useEffect } from "react";
// import { useCart } from "@/hooks/cartOrder";

export function ReceiptCart() {
    // const {showGroupedCartItems, totalCartPrice, totalCartQuantity,} = useCart()

    // useEffect(() => {
    //     // console.log('render cart', {showGroupedCartItems, totalCartPrice, totalCartQuantity,} )
    //     if (showGroupedCartItems && totalCartPrice && totalCartPrice) {
    //         console.log('passei por aqui receiptCart' )
    //     } 
    // }, [showGroupedCartItems, totalCartPrice, totalCartQuantity])

    return (
        // <Suspense fallback={<p>Loading...</p>}>
            <CartList
                // totalCartPrice={totalCartPrice}
                // totalCartQuantity={totalCartQuantity}
                // showGroupedCartItems={showGroupedCartItems}
            />
        // </Suspense> 
    )
}