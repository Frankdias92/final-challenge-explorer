import { HandleWithCheckout } from "@/components/checkout/handleWithCheckout"
import Delivery from "./delivery/page"
import { LogoHeader } from "@/components/header/logo"

export default function CheckOut () {
    return (
        <section className="flex w-full min-h-screen flex-col lg:flex-row  gap-16 sm:px-12 px-4 xl:px-0 xl:pl-40">
            
            <span className="flex flex-col w-full h-full mt-24">
                <LogoHeader />
                <HandleWithCheckout />
            </span>

            <span className="hidden xl:flex w-2/3 bg-dark-400 px-12">
                <Delivery />
            </span>

        </section>
    )
}