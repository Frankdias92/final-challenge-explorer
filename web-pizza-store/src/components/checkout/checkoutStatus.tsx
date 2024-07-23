'use client'

import { useState } from "react";
import { Steps } from "./steps";
import { useOrders } from "@/hooks/orderRequest";
import { LogoHeader } from "../header/logo";


export function CheckoutStatus () {
    const { currentStep } = useOrders()


    return (
        <section className="flex flex-col w-full h-28 {bg-dark-400} py-8">
                <LogoHeader />
            
            {/* <span className="flex w-3/4 m-auto items-center"> */}
                {/* <>
                    <Steps 
                        currentStep={currentStep}
                        numberOfSteps={3}
                    />
                </> */}
            {/* </span> */}
        </section>
    )
}