'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, Button } from "@nextui-org/react";

import { PiReceipt } from "react-icons/pi";
import { DropdownItem } from "@nextui-org/react";
import { DrobMenuCart } from "../cart/drobMenuCart";
import { ButtonText } from "../buttonText";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CartProps, useOrders } from "@/hooks/orderRequest";

export function ReceiptCart() {
    const {cart } = useOrders();
    // const [test, setTest] = useState()
    const router = useRouter()
    const totalQuantity = cart ? cart.map(item => item.quantity).reduce((sum, current) => sum + current, 0) : 0

    function getFilteredCartItems(cart: CartProps[]) {
        return cart.reduce((acc, item) => {
            const existingItem = acc.find(i => i.meal_id === item.meal_id)
            if (existingItem) {
                existingItem.quantity += item.quantity
                existingItem.price += item.price * item.quantity
            } else {
                acc.push({ ...item, price: item.price * item.quantity })
            }
            return acc
        }, [] as CartProps[])
    }

    const groupedCartItems = cart ? getFilteredCartItems(cart) : []
    const totalPrice = groupedCartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)

    console.log('print filtered')

    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Button variant="bordered" className="h-full rounded-full md:rounded-md">
                    {/* Desktop */}
                    <span className="hidden md:flex  h-full gap-2 items-center px-4 justify-center rounded-md bg-tint-tomato-400">
                        <PiReceipt className="text-4xl" />
                        <span>
                            pedidos 
                            ({totalQuantity})
                        </span>
                    </span>

                    {/* Mobile */}
                    <span className="flex flex-1  relative items-center md:hidden">
                        <PiReceipt className="flex text-4xl text-center" />
                        <span className="flex w-6 h-6 p-2 justify-center items-center rounded-full bg-tint-tomato-400 absolute -top-1 right-1
                            ">
                            <span className="flex items-center justify-center font-medium text-sm">
                                {totalQuantity}
                            </span>
                        </span>
                    </span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu 
                closeOnSelect={false}
                variant="faded" 
                aria-label="Static Actions" 
                className="max-h-[550px]"
            >
                
                <DropdownItem key='new' className="flex bg-dark-300 p-4 rounded-lg">
                    <div className="flex text-light-100 justify-between items-center">
                        <div className="flex items-center gap-2">
                            <PiReceipt className="flex text-4xl text-center" />
                            <span className="flex size-6 text-xs justify-center items-center bg-tint-tomato-400 rounded-full">
                                {totalQuantity}
                            </span>
                        </div>
                        <span className="flex text-light-500">
                            Total: {totalPrice}
                        </span>
                    </div>

                    <ul className="flex flex-col w-72 bg-dark-300 text-light-300 font-poppins gap-2
                    h-[350px] overscroll-y-contain overflow-y-scroll my-4">
                        
                        {groupedCartItems?.map((item) => (
                            <li key={item.meal_id}
                                className="hover:bg-dark-100 rounded-md p-2"
                                onClick={() => router.push(`home/${item.meal_id}`)}
                            >
                                    <DrobMenuCart item={item}/>
                                    <div className="w-full h-0.5 bg-dark-100"/>
                            </li>
                        ))}

                    </ul>

                    <span className="flex">
                        <ButtonText text="Checkout" size={48} onclick={() => router.push('/checkout')}/>
                    </span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>   
    )
}
