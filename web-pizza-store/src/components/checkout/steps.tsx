import { useOrders } from "@/hooks/orderRequest";
import { useRouter } from "next/navigation";
import React from "react";

type StepProps = {
    currentStep: number
    numberOfSteps: number
}
export function Steps({currentStep, numberOfSteps}: StepProps) {
    const activeColor = (index: number) => (currentStep - 1) >= index ? 'bg-dark-300 text-light-100 cursor-pointer' : 'bg-light-400/30  text-light-100/30 cursor-pointer'
    const isFinalStep = (index: number) => index === numberOfSteps - 1
    const arrayp: string[] = ['1', '2', '3']
    const steps: string[] = ['Checkout', 'Delivery', 'Sucesso']
    const router = useRouter()
    const { HandleWithCurrentStep } = useOrders()


    function handleWithSteps (step: number) {
        HandleWithCurrentStep(step)
    }

    return (
        <div className="flex items-center w-3/4 m-auto relative">
            {Array.from({length: numberOfSteps}).map((_, index) => (
                <React.Fragment key={index}>
                    <div className={`flex items-center justify-center rounded-full w-6 h-6 p-4 ${activeColor(index)}`}
                        onClick={() => handleWithSteps(index)}
                    >
                        {arrayp[index]}
                    </div>
                    {isFinalStep(index) ? null : 
                        <span className={`h-1 w-full  ${activeColor(index)} relative`}>
                            <div className="flex absolute text-center justify-center top-5 -left-4 -translate-x-1/2 w-2/3">
                                {steps[index]}
                            </div>
                        </span>
                    }
                </React.Fragment>
            ))}

            <span className="flex absolute text-center justify-center top-8 right-4 w-1/2 translate-x-1/2 text-light-300/30">
                {steps[2]}
            </span>
        </div>
    )
}