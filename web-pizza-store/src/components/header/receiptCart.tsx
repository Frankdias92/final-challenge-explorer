import { Dropdown, DropdownTrigger, DropdownMenu, Button } from "@nextui-org/react";

import { UseAuth } from "@/hooks/auth";
import { PiReceipt } from "react-icons/pi";
import { DropdownItem } from "@nextui-org/react";

export function ReceiptCart() {
    const { user, cart } = UseAuth();
    const totalQuantity = cart ? cart.map(item => item.quantity).reduce((sum, current) => sum + current, 0) : 0;

    function renderCartItems() {
        return (
            <>
                {cart?.map((item, index) => (
                    <DropdownItem key={index}>
                        {item.name}
                    </DropdownItem>
                ))}
            </>
        );
    }

    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Button variant="bordered">
                    <span className="size-8 relative">
                        <PiReceipt className="text-3xl text-center" />
                        <span className="flex w-6 h-6 p-2 justify-center items-center rounded-full bg-tint-tomato-400 absolute top-0 right-0 translate-x-1/2 -translate-y-1/4">
                            <span className="flex items-center justify-center font-medium text-sm">
                                {totalQuantity}
                            </span>
                        </span>
                    </span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">
                
                <DropdownItem key='new'>
                    <div className="flex flex-col w-60 bg-red-500 rounded-lg">
                        {cart?.map((item, index) => (
                            <div key={index}>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>   
    )
}
