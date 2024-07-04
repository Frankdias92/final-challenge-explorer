import { Steps } from "./steps";


export function CheckoutStatus () {
    return (
        <section className="flex flex-col w-full h-28 bg-dark-400">
            <Steps 
                currentStep={1}
                numberOfSteps={3}
            />

            <div>
                <button type="button">previous</button>
                <button type="button">Next</button>
            </div>
        </section>
    )
}