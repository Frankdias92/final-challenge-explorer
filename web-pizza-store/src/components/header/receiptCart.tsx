'use client'

import {  Suspense } from "react";

import { useOrders } from "@/hooks/orderRequest";
import { CartList } from "./cartList";

export function ReceiptCart() {
    const {cartSummary} = useOrders()

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <CartList
                totalCartPrice={cartSummary.totalPrice}
                totalCartQuantity={cartSummary.totalQuantity}
                showGroupedCartItems={cartSummary.groupedItems}
            />
        </Suspense> 
    )
}