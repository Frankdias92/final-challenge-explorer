import React from "react";

type StepProps = {
    currentStep: number
    numberOfSteps: number
}
export function Steps({currentStep, numberOfSteps}: StepProps) {
    const activeColor = (index: number) => (currentStep - 1) >= index ? 'bg-dark-300 text-light-100' : 'bg-light-400/30  text-light-100/30'
    const isFinalStep = (index: number) => index === numberOfSteps - 1
    const arrayp: string[] = ['1', '2', '3']

    return (
        <div className="flex items-center w-3/4 m-auto">
            {Array.from({length: numberOfSteps}).map((_, index) => (
                <React.Fragment key={index}>
                    <div className={`flex items-center justify-center rounded-full w-6 h-6 p-4 ${activeColor(index)}`}>
                    {arrayp[index]}
                    </div>
                    {isFinalStep(index) ? null : 
                        <span className={`h-1 w-full  ${activeColor(index)} relative`}>
                            <div className="flex absolute text-center justify-center top-5 -left-4 -translate-x-1/2 w-2/3">
                                test width
                            </div>
                        </span>
                    }
                </React.Fragment>
            ))}
        </div>
    )
}