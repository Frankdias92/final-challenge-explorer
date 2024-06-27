'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, Button } from "@nextui-org/react";

import { PiReceipt } from "react-icons/pi";
import { DropdownItem } from "@nextui-org/react";
import { DrobMenuCart } from "../cart/drobMenuCart";
import { ButtonText } from "../buttonText";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useOrders } from "@/hooks/orderRequest";

export function ReceiptCart() {
    const {cart } = useOrders();
    const router = useRouter()
    const totalQuantity = cart ? cart.map(item => item.quantity).reduce((sum, current) => sum + current, 0) : 0


    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Button variant="bordered" className="h-full rounded-full">
                    <span className="flex flex-1  relative items-center  ">
                        <PiReceipt className="flex text-4xl text-center" />
                        <span className="flex w-6 h-6 p-2 justify-center items-center rounded-full bg-tint-tomato-400 absolute -top-1 right-1">
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
                            Total: R$ 120,90
                        </span>
                    </div>

                    <ul className="flex flex-col w-72 bg-dark-300 text-light-300 font-poppins gap-2
                    h-[350px] overscroll-y-contain overflow-y-scroll my-4">
                        
                        {cart?.map((item) => (
                            <li key={item.cart_item_id}
                                className="hover:bg-dark-100 rounded-md p-2"
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
