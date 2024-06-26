import { Dropdown, DropdownTrigger, DropdownMenu, Button } from "@nextui-org/react";

import { UseAuth } from "@/hooks/auth";
import { PiReceipt } from "react-icons/pi";
import { DropdownItem } from "@nextui-org/react";
import { DrobMenuCart } from "../cart/drobMenuCart";

export function ReceiptCart() {
    const { user, cart } = UseAuth();
    const totalQuantity = cart ? cart.map(item => item.quantity).reduce((sum, current) => sum + current, 0) : 0

    return (
        <Dropdown backdrop="blur" >
            <DropdownTrigger >
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
            <DropdownMenu variant="faded" aria-label="Static Actions">
                
                <DropdownItem key='new'>
                    <ul className="flex flex-col w-60 bg-dark-300 text-light-300 rounded-lg p-4 font-poppins">
                        {cart?.map((item, index) => (
                            <li key={index}
                                className="hover:bg-dark-100 rounded-md px-2"
                            >
                                <DrobMenuCart
                                    item={item}
                                />
                            </li>
                        ))}
                    </ul>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>   
    )
}
