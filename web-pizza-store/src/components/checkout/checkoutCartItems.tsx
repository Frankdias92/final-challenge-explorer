import { Image } from "@nextui-org/react"
import NextImage from "next/image";

type CheckoutItems = {
    image: string
    label: string
    price: number
    quantity: number
}

export function CheckoutCartItems ({image, label, price, quantity}: CheckoutItems) {
    return (
        <div className="flex w-full bg-dark-500 rounded-lg p-4 gap-4">
            <div className="flex w-1/3">
                <Image
                        as={NextImage}
                        width={690}
                        height={690}
                        src={image || 'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A3333%2Ffiles%2F44d6d72e16447cb98ec4-63c83ebeef5ea2f341f3dd4c_OG-perpetuo.jpg&w=640&q=75'}
                        alt="NextUI hero Image"
                        className="flex rounded-full"
                    />
            </div>

            <div className="flex flex-col w-2/3 justify-between text-light-100 py-2">
                    <span className="font-medium text-base">
                        {label}
                    </span>
                <div className="flex justify-between ">
                    <span className="text-sm font-roboto">
                        R$ {price}
                    </span>
                    <span className="flex items-center bg-dark-600 text-light-500 text-xs font-roboto px-2 rounded-md">
                        quantidade: {quantity}
                    </span>
                </div>
            </div>
        </div>
    )
}