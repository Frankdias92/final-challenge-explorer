'use client'

import { useState } from "react";
import { Steps } from "./steps";
import { useOrders } from "@/hooks/orderRequest";


export function CheckoutStatus () {
    const { currentStep } = useOrders()


    return (
        <section className="flex flex-col w-full h-28 bg-dark-400 py-8">
            <Steps 
                currentStep={currentStep}
                numberOfSteps={3}
            />
        </section>
    )
}