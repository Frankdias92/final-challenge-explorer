import { HandleWithCheckout } from "@/components/checkout/handleWithCheckout"
import Delivery from "./delivery/page"
import { CheckoutStatus } from "@/components/checkout/checkoutStatus"

export default function CheckOut () {
    return (
        <section className="flex w-full m-auto gap-16 pl-40">
            
            <span className="flex flex-col w-full">
                <CheckoutStatus />
                <HandleWithCheckout />
            </span>

            <span className="flex w-2/3 bg-dark-400 px-12">
                <Delivery />
            </span>
        </section>
    )
}