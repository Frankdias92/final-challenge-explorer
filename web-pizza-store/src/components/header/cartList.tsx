
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
    Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Button, DropdownSection 
} from "@nextui-org/react";

import { CartProps } from "@/hooks/orderRequest";
import { PiReceipt } from "react-icons/pi";
import { DrobMenuCart } from "../cart/drobMenuCart";
import { ButtonText } from "../buttonText";

type CartListProps = {
    totalCartQuantity: number
    totalCartPrice: number
    showGroupedCartItems: CartProps[]
}

export function CartList({totalCartQuantity, totalCartPrice, showGroupedCartItems}: CartListProps) {
    const router = useRouter()

    return (
        <Dropdown backdrop="blur"
            showArrow
            radius="sm"
            className="bg-transparent border-0 ring-0 rounded-full "
            >
            <DropdownTrigger>
                <Button variant="bordered" 
                    className="h-full rounded-full md:rounded-md border-0"
                    >
                    {/* Desktop */}
                    <span className="hidden md:flex  h-full gap-2 items-center px-4 justify-center rounded-md bg-tint-tomato-400 text-light-100">
                        <PiReceipt className="text-4xl" />
                        <span>
                            pedidos 
                            ({totalCartQuantity || 0})
                        </span>
                    </span>

                    {/* Mobile */}
                    <span className="flex flex-1  relative items-center md:hidden">
                        <PiReceipt className="flex text-4xl text-center" />
                        <span className="flex w-6 h-6 p-2 justify-center items-center rounded-full bg-tint-tomato-400 absolute -top-1 right-1
                            ">
                            <span className="flex items-center justify-center font-medium text-sm">
                                {totalCartQuantity || 0}
                            </span>
                        </span>
                    </span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu 
                closeOnSelect={true}
                variant="faded" 
                aria-label="Static Actions" 
                className="max-h-[550px]"

                // aria-label="Custom item styles"
                disabledKeys={["profile"]}
                // className="p-3"
                itemClasses={{
                base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "dark:data-[hover=true]:bg-dark-300",
                    "data-[selectable=true]:focus:bg-red-800",
                    "data-[focus-visible=true]:ring-red-800",
                ],
                }}
            >
                <DropdownSection title='Seu Carrinho'>
                    <DropdownItem key='cart' className="flex bg-dark-300 p-4 rounded-lg">
                        <div className="flex text-light-100 justify-between items-center">
                            <div className="flex items-center gap-2">
                                <PiReceipt className="flex text-4xl text-center" />
                                <span className="flex size-6 text-xs justify-center items-center bg-tint-tomato-400 rounded-full">
                                    {totalCartQuantity || 0}
                                </span>
                            </div>
                            <span className="flex text-light-500">
                                Total: {totalCartPrice}
                            </span>
                        </div>

                        <ul className="flex flex-col w-72 bg-dark-300 text-light-300 font-poppins gap-2
                            h-[350px] overscroll-y-contain overflow-y-scroll my-4">
                            
                            {showGroupedCartItems?.map((item) => (
                                <DrobMenuCart key={item.cart_item_id} item={item}/>
                            ))}

                        </ul>

                        <span className="flex">
                            <ButtonText text="Checkout" size={48} onclick={() => router.push('/checkout')}/>
                        </span>
                    </DropdownItem>

                </DropdownSection>
                
            </DropdownMenu>
        </Dropdown>
    )
}