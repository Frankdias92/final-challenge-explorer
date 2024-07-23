import { HandleWithCheckout } from "@/components/checkout/handleWithCheckout"
import Delivery from "./delivery/page"
import { CheckoutStatus } from "@/components/checkout/checkoutStatus"

export default function CheckOut () {
    return (
        <section className="grid grid-cols-3 w-full m-auto gap-16 pl-40">
            
            <span className="flex flex-col w-full col-span-2">
                <CheckoutStatus />
                <HandleWithCheckout />
            </span>

            <span className="flex w-full bg-dark-400 px-12">
                <Delivery />
            </span>
        </section>
    )
}