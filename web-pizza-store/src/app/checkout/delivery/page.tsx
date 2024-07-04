'use client'

import { ButtonText } from "@/components/buttonText"
import { useOrders } from "@/hooks/orderRequest"
import { useRouter } from "next/navigation"


export default function Delivery () {
    const { HandleWithCurrentStep, currentStep } = useOrders()
    const router = useRouter()

    function handleWithFinalStep() {
        HandleWithCurrentStep(2)
        router.push('')
    }
    return (
        <section className="flex w-full text-light-100">
            <span>delivery</span>

            <ButtonText text="Enviar Pedido" onclick={handleWithFinalStep} size={48}/>
        </section>
    )
}